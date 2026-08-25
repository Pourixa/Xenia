import { Link } from "react-router";
import { XeniaAvatar } from "../customUI/XeniaAvatar";
import { timeAgo } from "@/lib/utils";
import { Heart, LucideMessageSquare } from "lucide-react";

export function Post({ post }) {
  return (
    <div className="flex border-b pl-4 pr-4 pt-1 pb-1">
      <Link to={`/${post.author.username}`} className="p-0.5" draggable={false}>
        <XeniaAvatar
          imageSrc={post.author.avatarUrl}
          size="lg"
          name={post.author.name}
        />
      </Link>
      <div>
        <Link to={`/${post.author.username}`} draggable={false}>
          <div className="flex-wrap flex gap-1 gap-y-0 p-0.5">
            <div>{post.author.name}</div>
            <div className="flex gap-1 text-muted-foreground">
              <span>@{post.author.username}</span>
              <span>·</span>
              <span>{timeAgo(post.createdAt)}</span>
            </div>
          </div>
        </Link>
        <Link
          to={`/${post.author.username}/post/${post.id}`}
          className="flex flex-col"
          draggable={false}
        >
          <div className="p-0.5">{post.content}</div>
        </Link>
        <div className="flex p-0.5 gap-2 text-muted-foreground items-center">
          <Link
            draggable={false}
            to={`/${post.author.username}/post/${post.id}#comments`}
          >
            <div className="flex gap-0.5 active:text-accent ">
                <LucideMessageSquare className="active:fill-accent" />
              <span>{post._count.comments}</span>
            </div>
          </Link>
          <div className="flex gap-0.5 active:text-primary hover:cursor-pointer">
              <Heart className="active:fill-primary hover:cursor-pointer"/>
            <span>{post._count.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
