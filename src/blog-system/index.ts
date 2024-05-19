import { loadFront } from "yaml-front-matter";
import { RawModule, Blog, BlogTag, DynamicInfo, TextInfo } from "@/types";
import { arrayRemove } from "@/utils";

function sortTextInfoByDate<T extends TextInfo[]>(_list: T): T {
    var list = _list;

    var latestIndex = null;
    for(let i = 0; i < list.length; i++) {
        for(let j = i; j < list.length; j++) {
            var timeStamp = list[j].date.getTime();

            if(latestIndex === null || timeStamp < list[latestIndex].date.getTime()) {
                latestIndex = j;
            }
        }
        if(latestIndex === null) break;

        list = [list[latestIndex], ...list] as T;
        list = arrayRemove(list, latestIndex + 1) as T;
        latestIndex = null;
    }

    return list;
}

export class BlogSystem {
    private static instance: BlogSystem;

    private blogList: Blog[] = [];
    private dynamicList: DynamicInfo[] = [];
    private tagList: BlogTag[] = [];

    private constructor() {
        this.initBlogList();
        this.initDynamicList();
        this.initTagList();
    }

    private initBlogList(): void {
        // Import blogs by webpack
        const moduleContext = require.context("../posts", false, /\.md$/);
        const modules = moduleContext.keys().map(moduleContext) as RawModule[];

        var list: Blog[] = [];
        for(let module of modules) {
            list.push(this.resolveTextInfo(module.default));
        }

        // Sort blogs by date
        list = sortTextInfoByDate(list);

        this.blogList = list;
    }

    private initDynamicList(): void {
        // Import dynamic by webpack
        const moduleContext = require.context("../dynamic", false, /\.md$/);
        const modules = moduleContext.keys().map(moduleContext) as RawModule[];

        var list: DynamicInfo[] = [];
        for(let module of modules) {
            list.push(this.resolveTextInfo(module.default));
        }

        // Sort dynamic by date
        list = sortTextInfoByDate(list);

        this.dynamicList = list;
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

    public getDynamicList(): DynamicInfo[] {
        return this.dynamicList;
    }

    public getTagList(): BlogTag[] {
        return this.tagList;
    }

    public resolveTextInfo<T extends TextInfo>(blogText: string): T {
        const data = loadFront(blogText);
        return data as T;
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
