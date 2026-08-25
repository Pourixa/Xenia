import { Link } from "react-router";
import { XeniaAvatar } from "../customUI/XeniaAvatar";
import { timeAgo } from "@/lib/utils";
import { Heart, LucideMessageSquare } from "lucide-react";

export function Comment({ comment }) {
    console.log(comment)
  return (
    <div className="flex border-b pl-4 pr-4 pt-1 pb-1">
      <Link to={`/${comment.commenter.username}`} className="p-0.5" draggable={false}>
        <XeniaAvatar
          imageSrc={comment.commenter.avatarUrl}
          size="lg"
          name={comment.commenter.name}
        />
      </Link>
      <div>
        <Link to={`/${comment.commenter.username}`} draggable={false}>
          <div className="flex-wrap flex gap-1 gap-y-0 p-0.5">
            <div>{comment.commenter.name}</div>
            <div className="flex gap-1 text-muted-foreground">
              <span>@{comment.commenter.username}</span>
              <span>·</span>
              <span>{timeAgo(comment.createdAt)}</span>
            </div>
          </div>
        </Link>
        <Link
          to={`/${comment.commenter.username}/comment/${comment.id}`}
          className="flex flex-col"
          draggable={false}
        >
          <div className="p-0.5">{comment.content}</div>
        </Link>
      </div>
    </div>
  );
}
