import { getRequest } from "@/lib/requests";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { Post } from "../Home/Post";
import { SquareXIcon } from "lucide-react";
import { XeniaEmpty } from "../customUI/XeniaEmpty";
import { XeniaLoadMore } from "../customUI/XeniaLoadmore";

export function ProfilePosts() {
  const [posts, setPosts] = useState(null);
  const { profileUser, isSigned } = useOutletContext();
  const [pag, setPag] = useState(0);
  useEffect(() => {
    (async () => {
      if (pag != null) {
        const res = await getRequest(
          "/post/user/" + profileUser.id + "?p=" + pag,
        );
        const json = await res.json();
        if (isSigned) json.map((pst) => (pst.isLiked = pst.likes.length > 0));
        if (json.length === 0) setPag(null);
        else if (pag === 0) setPosts(json);
        else setPosts((prev) => [...prev, ...json]);
      }
    })();
  }, [pag]);

  if (!posts) return <>loading</>;
  return (
    <div className="flex flex-col items-center grow">
      <div className="w-full">
        {posts.length > 0 ? (
          posts.map((pst, idx) => {
            return (
              <Post
                setPosts={setPosts}
                post={pst}
                key={pst.id}
                isSigned={isSigned}
                idx={idx}
              />
            );
          })
        ) : (
          <XeniaEmpty
            HeaderIcon={<SquareXIcon />}
            title={"No posts by this user"}
          />
        )}
      </div>
      <XeniaLoadMore pag={pag} setPag={setPag} list={posts} />
    </div>
  );
}
