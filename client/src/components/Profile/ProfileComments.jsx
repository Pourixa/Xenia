import { getRequest } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { Comment } from "./Comment"
import { XeniaEmpty } from "../customUI/XeniaEmpty";
import { MessageSquareX } from "lucide-react";
import { XeniaLoadMore } from "../customUI/XeniaLoadmore";

export function ProfileComments() {
  const [comments, setComments] = useState(null);
  const [pag , setPag] = useState(0);
  const {profileUser} = useOutletContext();
  useEffect(() => {
    (async () => {
      if(pag!=null){
      const res = await getRequest("/post/comments/" + profileUser.id + "?p=" + pag);
      const json = await res.json()
    if(pag === 0 ) 
      setComments(json);
    else 
      setComments(prev => [...prev, ...json])
    if(json.length === 0)
      setPag(null)
      }
    })();
  },[pag]);
  if (!comments) return <>loading</>;
  return <div className="overflow-auto flex flex-col items-center grow w-full">
      <div className="w-full">
        {comments.length > 0 ? comments.map((cmt) => {
          return <Comment comment={cmt} key={cmt.id}/>
        }) : <XeniaEmpty HeaderIcon={<MessageSquareX/>} title={"No comments by this user"}/>}
      </div>
      <XeniaLoadMore pag={pag} setPag={setPag} list={comments}/>
    </div>
}
