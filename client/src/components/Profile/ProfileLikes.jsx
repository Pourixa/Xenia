import { getRequest } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Like } from "./Like";
import { HeartX } from "lucide-react";
import { XeniaEmpty } from "../customUI/XeniaEmpty";

export function ProfileLikes() {
  const [likes, setLikes] = useState(null);
  const params = useParams();
  useEffect(() => {
    (async () => {
      const res = await getRequest("/post/likes/" + params.username);
      const json = await res.json()
      setLikes(json);
    })();
  },[]);
  if (!likes) return <>loading</>;
  return <div className="overflow-auto flex flex-col items-center grow w-full">
      <div className="w-full">
        {likes.length > 0 ? likes.map((like) => {
          return <Like like={like} key={like.id}/>
        }) :  <XeniaEmpty HeaderIcon={<HeartX />} title={"No likes by this user"}/>}
      </div>
    </div>
}