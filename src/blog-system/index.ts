import { resolveBlog } from "@/blog-system/resolve";
import { Blog } from "@/types";

export async function getBlog(id: string): Promise<Blog> {
    var blogResponse = await fetch("/posts/"+ id);
    var text = await blogResponse.text();

    return await resolveBlog(text);
}

export async function getList(): Promise<Blog[]> {
    var listResponse = await fetch("/posts/list.json");
    var json: string[] = await listResponse.json();
    var list = [];

    for(let item of json) {
        list.push(await getBlog(item));
    }

    return list;
}
