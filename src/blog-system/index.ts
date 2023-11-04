import { loadFront } from "yaml-front-matter";
import { RawModule, Blog } from "@/types";
import { arrayRemove } from "@/utils";

export function resolveBlog(blogText: string): Blog {
    const data = loadFront(blogText);
    return data as Blog;
}

export function getBlogList(shallSort: boolean = false): Blog[] {
    const moduleContext = require.context("../posts", false, /\.md$/);
    const modules = moduleContext.keys().map(moduleContext) as RawModule[];
    var list: Blog[] = [];

    for(let module of modules) {
        list.push(resolveBlog(module.default));
    }

    if(!shallSort) return list;

    // Sort by date
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

    return list;
}

export function getBlogByTitle(title: string): Blog | null {
    const list = getBlogList();

    for(let blog of list) {
        if(blog.title === title) return blog;
    }

    return null;
}
