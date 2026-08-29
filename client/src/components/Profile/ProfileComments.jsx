import { getRequest } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Comment } from "./comment"

export function ProfileComments() {
  const [comments, setComments] = useState(null);
  const params = useParams();
  useEffect(() => {
    (async () => {
      const res = await getRequest("/post/comments/" + params.username);
      const json = await res.json()
      setComments(json);
    })();
  },[]);
  if (!comments) return <>loading</>;
  console.log(comments)
  return <div className="overflow-auto flex flex-col items-center grow w-full">
      <div className="w-full">
        {comments.map((cmt) => {
          return <Comment comment={cmt} key={cmt.id}/>
        })}
      </div>
    </div>
}
