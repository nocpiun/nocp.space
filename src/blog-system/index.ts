import { loadFront } from "yaml-front-matter";
import { RawModule, Blog, BlogTag } from "@/types";
import { arrayRemove } from "@/utils";

export function resolveBlog(blogText: string): Blog {
    const data = loadFront(blogText);
    return data as Blog;
}

export function getBlogList(shallSort: boolean = false): Blog[] {
    // Import blogs by webpack
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

export function getTagList(): BlogTag[] {
    const list = getBlogList();
    var tagList: BlogTag[] = [];

    for(let blog of list) {
        tagLoop: for(let tag of blog.tags) {
            for(let i = 0; i < tagList.length; i++) {
                if(tagList[i].name === tag) {
                    tagList[i].amount++;
                    continue tagLoop;
                }
            }
            tagList.push({ name: tag, amount: 1 });
        }
    }

    return tagList;
}

export function getTag(tagName: string): BlogTag | null {
    const tagList = getTagList();

    for(let tag of tagList) {
        if(tag.name === tagName) {
            return tag;
        }
    }

    return null;
}

export function hasTag(tagName: string): boolean {
    const tagList = getTagList();
    for(let tag of tagList) {
        if(tag.name === tagName) {
            return true;
        }
    }
    return false;
}

export function getBlogByTitle(title: string): Blog | null {
    const list = getBlogList();

    for(let blog of list) {
        if(blog.title === title) return blog;
    }

    return null;
}

export function getBlogsByTag(tagName: string): Blog[] {
    const list = getBlogList();
    var result: Blog[] = [];

    for(let blog of list) {
        if(blog.tags.includes(tagName)) {
            result.push(blog);
        }
    }

    return result;
}

export function getBlogAmount(): number {
    const list = getBlogList();

    return list.length;
}
