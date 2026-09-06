import { getRequest } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { Post } from "../Home/Post";
import { SquareXIcon } from "lucide-react";
import { XeniaEmpty } from "../customUI/XeniaEmpty";

export function ProfilePosts() {
  const [posts, setPosts] = useState(null);
  const params = useParams();
  const isSigned = useOutletContext()
  useEffect(() => {
    (async () => {
      const res = await getRequest("/post/user/" + params.username);
      const json = await res.json()
      if (isSigned) json.map(pst => pst.isLiked = pst.likes.length > 0);
      setPosts(json);
    })();
  },[]);

  if (!posts) return <>loading</>;
  return <div className="overflow-auto flex flex-col items-center grow">
      <div className="w-full">
        {posts.length > 0 ? posts.map((pst,idx) => {
          return <Post setPosts={setPosts} post={pst} key={pst.id} isSigned={isSigned} idx={idx}/>
        })  : <XeniaEmpty HeaderIcon={<SquareXIcon />} title={"No posts by this user"}/>}
      </div>
    </div>
}
