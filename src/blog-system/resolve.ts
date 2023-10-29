import markdownIt from "markdown-it";
import markdownItFrontMatter from "markdown-it-front-matter";
import yaml from "yaml";

import { Blog } from "@/types";

export function resolveBlogContent(blogText: string): string {
    return markdownIt().render(blogText).replace(/^<hr>[\S\s]+<hr>/, "");
}

export function resolveBlog(blogText: string): Promise<Blog> {
    const md = markdownIt();

    return new Promise((resolve, reject) => {
        md.use(markdownItFrontMatter, (rawMeta) => {
            const meta = yaml.parse(rawMeta);
            resolve({
                ...meta,
                content: resolveBlogContent(blogText)
            });
        });
        md.render(blogText);
    });
}
