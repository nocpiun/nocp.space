/**
 * Copyright (c) 2024 NriotHrreion
 */

"use strict";

const { validate } = require("schema-utils");
const { Feed } = require("feed");
const { loadFront } = require("yaml-front-matter");
const sanitizeHtml = require("sanitize-html");
const marked = require("marked");
const fs = require("fs");
const path = require("path");

/** @type {import("json-schema").JSONSchema4} */
const schema = {
    title: "FeedPlugin Options",
    type: "object",
    properties: {
        site: {
            description: "Base URL of Your Site",
            type: "string"
        },
        postPath: {
            description: "Path of Your Articles",
            type: "string"
        },
        output: {
            description: "Output Files",
            type: "object",
            properties: {
                json: {
                    type: "string"
                },
                atom: {
                    type: "string"
                }
            }
        },
        feedConfig: {
            description: "Configuration of Feed",
            type: "object",
            properties: {
                title: {
                    description: "Feed Title",
                    type: "string"
                },
                description: {
                    description: "Feed Description",
                    type: "string"
                },
                id: {
                    description: "Feed ID (Website Link)",
                    type: "string"
                },
                link: {
                    description: "Website Link",
                    type: "string"
                },
                language: {
                    description: "Feed Language",
                    type: "string"
                },
                image: {
                    description: "Website Banner",
                    type: "string"
                },
                favicon: {
                    description: "Website Icon",
                    type: "string"
                },
                copyright: {
                    description: "Website Copyright Info",
                    type: "string"
                },
                updated: {
                    description: "Latest Updating Time",
                    instanceof: "Date"
                },
                generator: {
                    description: "Feed Generator",
                    type: "string"
                },
                feedLinks: {
                    description: "Feed Links",
                    type: "object",
                    properties: {
                        json: {
                            type: "string"
                        },
                        atom: {
                            type: "string"
                        }
                    }
                },
                author: {
                    description: "Feed Author",
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        link: {
                            type: "string"
                        }
                    }
                }
            }
        }
    },
    additionalProperties: false
};

class FeedPlugin {
    constructor(options = {}) {
        validate(schema, options, {
            name: "FeedPlugin",
            baseDataPath: "options",
        });
        this.options = options;
    }
    
    /** @param {import("webpack").Compiler} compiler */
    apply(compiler) {
        compiler.hooks.done.tap("FeedPlugin", async () => {
            var feed = new Feed(this.options.feedConfig);
            var sourceFiles = fs.readdirSync(this.options.postPath, { encoding: "utf-8" });
            var posts = [];
            
            for(let i = 0; i < sourceFiles.length; i++) {
                if(path.extname(sourceFiles[i]) !== ".md") { // markdown files only
                    for(let j = i; j < sourceFiles.length; j++) {
                        if(j + 1 === sourceFiles.length) {
                            sourceFiles.pop();
                            break;
                        }
                        sourceFiles[j] = sourceFiles[j + 1];
                    }
                    i--;
                } else {
                    var rawFile = fs.readFileSync(path.resolve(this.options.postPath, sourceFiles[i]));
                    posts.push(loadFront(rawFile));
                }
            }

            for(let post of posts) {
                if(!post.hidden) {
                    feed.addItem({
                        title: post.title,
                        author: post.author,
                        date: post.date,
                        description: post.excerpt,
                        content: sanitizeHtml(await marked.parse(post.__content)),
                        image: this.options.site + post.photo,
                        id: this.options.feedConfig.id +"/"+ post.title,
                        link: this.options.feedConfig.link +"/"+ post.title,
                    });
                }
            }

            if(this.options.output.json) fs.writeFileSync(path.resolve(compiler.outputPath, this.options.output.json), feed.json1());
            if(this.options.output.atom) fs.writeFileSync(path.resolve(compiler.outputPath, this.options.output.atom), feed.atom1());
        });
    }
}

module.exports = { FeedPlugin };
