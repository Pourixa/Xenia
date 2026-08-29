import { Link, useLocation } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";

export function ProfileTabs() {
  const [tab, setTab] = useState("posts");
  const location = useLocation();
console.log(location)
  useEffect(() => {
    const parts = location.pathname.split("/");

    if (parts.length === 2) {
      setTab("posts");
    } else {
      setTab(parts[2]);
    }
  }, [location.pathname]);
  return (
    <Tabs
      value={tab}
      className={
        "flex justify-center sticky top-0 w-full bg-background border-b-2 z-999 p-1 pl-4 pr-4 "
      }
    >
      <TabsList
        variant="default"
        className={"flex justify-between w-full bg-background"}
      >
        <Link to={""}>
          <TabsTrigger
            onClick={() => setTab("posts")}
            value="posts"
            className={"border-3 border-foreground hover:cursor-pointer"}
          >
            Posts
          </TabsTrigger>
        </Link>
        <Link to={"comments"}>
          <TabsTrigger
            onClick={() => {
              setTab("comments");
            }}
            value="comments"
            className={"border-3 border-foreground hover:cursor-pointer"}
          >
            Comments
          </TabsTrigger>
        </Link>
        <Link to={"likes"}>
          <TabsTrigger
            onClick={() => {
              setTab("likes");
            }}
            value="likes"
            className={"border-3 border-foreground hover:cursor-pointer"}
          >
            Likes
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
