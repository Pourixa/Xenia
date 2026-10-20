import { getRequest } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { Comment } from "./Comment";
import { XeniaEmpty } from "../customUI/XeniaEmpty";
import { MessageSquareX } from "lucide-react";
import { XeniaLoadMore } from "../customUI/XeniaLoadmore";
import { MAX_COMMENTS } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

export function ProfileComments() {
  const [comments, setComments] = useState(null);
  const [pag, setPag] = useState(0);
  const { profileUser } = useOutletContext();
useEffect(() => {
  if (pag == null) return;
  let cancelled = false;

  (async () => {
    try {
      const res = await getRequest(
        "/post/comments/" + profileUser.id + "?p=" + pag,
      );
      if (!res.ok) throw new Error("Failed to load comments");
      const json = await res.json();
      if (cancelled) return;

      setComments((prev) => (pag === 0 ? json : [...prev, ...json]));
      if (json.length < MAX_COMMENTS) setPag(null); // last page
    } catch {
      if (!cancelled) {
        setComments((prev) => prev ?? []);
        setPag(null);
      }
    }
  })();

  return () => { cancelled = true; };
}, [pag, profileUser.id]);
  if (!comments) return <div className="w-full h-full items-center"><Spinner/></div>;
  return (
    <div className="overflow-auto flex flex-col items-center grow w-full">
      <div className="w-full">
        {comments.length > 0 ? (
          comments.map((cmt) => {
            console.log(cmt)
            return <Comment comment={cmt} key={cmt.id} />;
          })
        ) : (
          <XeniaEmpty
            HeaderIcon={<MessageSquareX />}
            title={"No comments by this user"}
          />
        )}
      </div>
      <XeniaLoadMore pag={pag} setPag={setPag} list={comments} />
    </div>
  );
}
