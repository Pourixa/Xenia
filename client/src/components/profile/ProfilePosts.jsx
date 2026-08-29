import { getRequest } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Post } from "../Home/Post";

export function ProfilePosts() {
  const [posts, setPosts] = useState(null);
  const params = useParams();
  useEffect(() => {
    (async () => {
      const res = await getRequest("/post/user/" + params.username);
      const json = await res.json()
      setPosts(json);
    })();
  });

  if (!posts) return <>loading</>;
  return <div className="overflow-auto flex flex-col items-center grow">
      <div>
        {posts.map((pst) => {
          return <Post post={pst} key={pst.id}/>
        })}
      </div>
    </div>
}
