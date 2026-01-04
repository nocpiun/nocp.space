"use client";

import type { Post } from "@/lib/blog";
import type { Note } from "@/lib/notes";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArticleCard } from "./article-card";
import { NoteCard } from "./note-card";

export function BlogTabs({ posts, notes }: {
  posts: Post[]
  notes: Note[]
}) {
  const [activeTab, setActiveTab] = useState("blog");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.history.pushState(null, "", `#${value}`);
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if(hash === "notes" || hash === "blog") {
      setActiveTab(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      if(newHash === "notes" || newHash === "blog") {
        setActiveTab(newHash);
      }
    };
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-2/3 max-sm:flex-1 max-sm:min-w-0">
      <TabsList className="[&>*]:cursor-pointer">
        <TabsTrigger value="blog">博客 ({posts.length})</TabsTrigger>
        <TabsTrigger value="notes">笔记 ({notes.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="blog">
        {posts.map((post, i) => <ArticleCard {...post} key={i}/>)}
      </TabsContent>
      <TabsContent value="notes">
        {notes.map((note, i) => <NoteCard {...note} key={i}/>)}
      </TabsContent>
    </Tabs>
  );
}
