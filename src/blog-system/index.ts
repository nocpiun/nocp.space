import { loadFront } from "yaml-front-matter";
import { RawModule, Blog, BlogTag } from "@/types";
import { arrayRemove } from "@/utils";

export class BlogSystem {
    private static instance: BlogSystem;

    private blogList: Blog[] = [];
    private tagList: BlogTag[] = [];

    private constructor() {
        this.initBlogList();
        this.initTagList();
    }

    private initBlogList(): void {
        // Import blogs by webpack
        const moduleContext = require.context("../posts", false, /\.md$/);
        const modules = moduleContext.keys().map(moduleContext) as RawModule[];

        var list: Blog[] = [];
        for(let module of modules) {
            list.push(this.resolveBlog(module.default));
        }

        // Sort blogs by date
        var latestIndex = null;
        for(let i = 0; i < list.length; i++) {
            for(let j = i; j < list.length; j++) {
                var timeStamp = list[j].date.getTime();

                if(!latestIndex || timeStamp < list[latestIndex].date.getTime()) {
                    latestIndex = j;
                }
            }
            if(!latestIndex) break;

            list = [list[latestIndex], ...list];
            list = arrayRemove(list, latestIndex + 1);
            latestIndex = null;
        }

        this.blogList = list;
    }

    private initTagList(): void {
        var list: BlogTag[] = [];
        for(let blog of this.blogList) {
            tagLoop: for(let tag of blog.tags) {
                for(let i = 0; i < list.length; i++) {
                    if(list[i].name === tag) {
                        list[i].amount++;
                        continue tagLoop;
                    }
                }
                list.push({ name: tag, amount: 1 });
            }
        }

        this.tagList = list;
    }

    public getBlogList(): Blog[] {
        return this.blogList;
    }

    public getTagList(): BlogTag[] {
        return this.tagList;
    }

    public resolveBlog(blogText: string): Blog {
        const data = loadFront(blogText);
        return data as Blog;
    }

    public getTag(tagName: string): BlogTag | null {
        for(let tag of this.tagList) {
            if(tag.name === tagName) {
                return tag;
            }
        }
    
        return null;
    }

    public hasTag(tagName: string): boolean {
        for(let tag of this.tagList) {
            if(tag.name === tagName) {
                return true;
            }
        }

        return false;
    }

    public getBlogByTitle(title: string): Blog | null {
        for(let blog of this.blogList) {
            if(blog.title === title) return blog;
        }
    
        return null;
    }

    public getBlogsByTag(tagName: string): Blog[] {
        var result: Blog[] = [];
    
        for(let blog of this.blogList) {
            if(blog.tags.includes(tagName)) {
                result.push(blog);
            }
        }
    
        return result;
    }

    public static get(): BlogSystem {
        if(!BlogSystem.instance) BlogSystem.instance = new BlogSystem();
        return BlogSystem.instance;
    }
}
