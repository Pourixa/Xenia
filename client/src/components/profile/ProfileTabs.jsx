import { Link } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";

export function ProfileTabs() {
    const [tab,setTab] = useState("posts")
    return <Tabs defaultValue="posts" className={"flex justify-center sticky top-0 w-full bg-background border-b-2 z-999 p-1 "} >
        <TabsList variant="default" className={"flex gap-16 bg-background"}>
            <Link to={""}>
                <TabsTrigger onClick={() => setTab("posts")} value="posts" className={"border-3 border-foreground hover:cursor-pointer"}>
                    Posts
                </TabsTrigger>
            </Link>
            <Link to={"comments"}>
                <TabsTrigger onClick={() => {setTab("comments")}} value="comments" className={"border-3 border-foreground hover:cursor-pointer"}>
                    Comments
                </TabsTrigger>
            </Link>
            <Link to={"likes"}>
                <TabsTrigger onClick={() => {setTab("likes")}} value="likes" className={"border-3 border-foreground hover:cursor-pointer"}>
                    Likes
                </TabsTrigger>
            </Link>
        </TabsList>
    </Tabs>
}