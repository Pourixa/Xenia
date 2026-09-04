import { Heart, MessageSquare } from "lucide-react";
import { XeniaAvatar } from "../customUI/XeniaAvatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { postRequest } from "@/lib/requests";
import { handleLikeUnLike } from "@/lib/utils";

export function Post({ setPost, post, isSigned }) {
  const { hash } = useLocation();
  const [scrollTrigger, setScrollTrigger] = useState(0);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("c");
  const loc = useLocation();
  const nav = useNavigate();
  async function handleFollowUnfollow() {
    if (!post.author.isFollowed) {
      const res = await postRequest(`/user/${post.author.username}/follow`, {
        followingUsername: post.author.username,
      });
      if (res.ok)
        setPost((prev) => ({
          ...prev,
          author: {
            ...prev.author,
            isFollowed: true,
          },
        }));
    } else {
      const res = await postRequest(`/user/${post.author.username}/unfollow`, {
        followingUsername: post.author.username,
      });
      if (res.ok)
        setPost((prev) => ({
          ...prev,
          author: {
            ...prev.author,
            isFollowed: false,
          },
        }));
    }
  }
  useEffect(() => {
    if (hash) {
      if (query) {
        const element = document.getElementById(query);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, [hash,scrollTrigger]);

  const date = new Date(post.createdAt);
  console.log(post)
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col p-0.5">
        <div className="flex justify-between ">
          <div
            className="flex gap-1"
            onClick={() => nav(`/${post.author.username}`)}
          >
            <XeniaAvatar
              imageSrc={post.author.avatarUrl}
              name={post.author.name}
            />
            <div className="flex flex-col">
              <span>{post.author.name}</span>
              <span className="text-muted-foreground">
                @{post.author.username}
              </span>
            </div>
          </div>
          {isSigned ? (
            <Button onClick={() => handleFollowUnfollow()}>
              {post.author.isFollowed ? "Unfollow" : "Follow"}
            </Button>
          ) : (
            <Button onClick={() => nav("/user/signin")}>
              Sign in to Follow
            </Button>
          )}
        </div>
        <div>{post.content}</div>
        <div className="text-muted-foreground">
          <time dateTime={date}>
            {date.toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
            })}{" "}
            ·{" "}
            {date.toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
      <Separator className={"h-px bg-muted-foreground"} />
      <div className="flex p-0.5 gap-2 text-muted-foreground items-center">
        <Link
          onClick={() => setScrollTrigger(prev => prev + 1)}
          state={{
            from: loc.pathname,
          }}
          to={"#comments"}
          className="flex gap-0.5 active:text-accent "
          draggable={false}
        >
          <MessageSquare className="active:fill-accent" />
          <span>{post._count.comments}</span>
        </Link>
        <div onClick={() => isSigned ? handleLikeUnLike(post,setPost) : nav("/user/signin")} className="flex gap-0.5 active:text-primary " draggable={false}>
          <Heart className={"active:fill-primary " + `${post.isLiked ? "fill-primary stroke-primary" : ""}`}/>
          <span>{post._count.likes}</span>
        </div>
      </div>
    </div>
  );
}
