import { loadFront } from "yaml-front-matter";
import { RawModule, Blog } from "@/types";

export function resolveBlog(blogText: string): Blog {
    const data = loadFront(blogText);
    return data as Blog;
}

export function getBlogList(): Blog[] {
    const moduleContext = require.context("../posts", false, /\.md$/);
    const modules = moduleContext.keys().map(moduleContext) as RawModule[];
    var list: Blog[] = [];

    for(let module of modules) {
        list.push(resolveBlog(module.default));
    }

    // Sort by date
    for(let blog of list) {
        var timeStamp = blog.date.getTime();
        /** @todo */
    }

    return list;
}
