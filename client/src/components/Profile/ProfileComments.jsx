import { getRequest } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Comment } from "./Comment"
import { XeniaEmpty } from "../customUI/XeniaEmpty";
import { MessageSquareX } from "lucide-react";

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
  return <div className="overflow-auto flex flex-col items-center grow w-full">
      <div className="w-full">
        {comments.length > 0 ? comments.map((cmt) => {
          return <Comment comment={cmt} key={cmt.id}/>
        }) : <XeniaEmpty HeaderIcon={<MessageSquareX/>} title={"No comments by this user"}/>}
      </div>
    </div>
}
