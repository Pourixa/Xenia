import { getRequest } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { Like } from "./Like";
import { HeartX } from "lucide-react";
import { XeniaEmpty } from "../customUI/XeniaEmpty";
import { XeniaLoadMore } from "../customUI/XeniaLoadmore";

export function ProfileLikes() {
  const [likes, setLikes] = useState(null);
  const [pag, setPag] = useState(0);
  const params = useParams();
  const { profileUser } = useOutletContext();
  useEffect(() => {
    (async () => {
      if (pag != null) {
        const res = await getRequest(
          "/post/likes/" + profileUser.id + "?p=" + pag,
        );
        const json = await res.json();
        if (json.length === 0) setPag(null);
        else if (pag === 0) setLikes(json);
        else setLikes((prev) => [...prev, ...json]);
      }
    })();
  }, [pag]);
  if (!likes) return <>loading</>;
  return (
    <div className="overflow-auto flex flex-col items-center grow w-full">
      <div className="w-full">
        {likes.length > 0 ? (
          likes.map((like) => {
            return <Like like={like} key={like.id} />;
          })
        ) : (
          <XeniaEmpty HeaderIcon={<HeartX />} title={"No likes by this user"} />
        )}
      </div>
      <XeniaLoadMore pag={pag} setPag={setPag} list={likes} />
    </div>
  );
}
