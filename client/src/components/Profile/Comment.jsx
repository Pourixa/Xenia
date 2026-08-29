import { timeAgo } from "@/lib/utils";
import { Link, useLocation } from "react-router";

export function Comment({ comment }) {
  const loc = useLocation()
  return (
    <div className="flex border-b pl-4 pr-4 pt-1 pb-1">
      {/* <Link to={`/${comment.commenter.username}`} className="p-0.5" draggable={false}>
        <XeniaAvatar
          imageSrc={comment.commenter.avatarUrl}
          size="lg"
          name={comment.commenter.name}
        />
      </Link> */}
      <div>
        <div className="flex gap-1 flex-wrap gap-y-0">
          <Link
            to={`/${comment.commenter.username}`}
            draggable={false}
            className="flex-wrap flex gap-1 gap-y-0 p-0.5"
            state={{
              from: loc.pathname,
            }}
          >
            <span className="font-bold">{comment.commenter.name}</span>
            {/* <span className="text-muted-foreground">
              @{comment.commenter.username}
            </span> */}
          </Link>
          <span>Commented on</span>
          <Link
            state={{
              from: loc.pathname,
            }}
            to={`/${comment.post.author.username}`}
            draggable={false}
            className="flex-wrap flex gap-1 gap-y-0 p-0.5"
          >
            <span className="text-muted-foreground font-bold">
              {comment.post.author.name}
            </span>
            <span className="text-muted-foreground">
              @{comment.post.author.username}
              <span className="text-foreground">'s</span>
            </span>
          </Link>
          <Link
            state={{
              from: loc.pathname,
            }}
            className="underline underline-offset-4 hover:text-primary text-center font-bold"
            to={`/${comment.post.author.username}/post/${comment.post.id}?c=${comment.id}#comments`}
          >
            Post
          </Link>
          <span>·</span>
          <span className="text-muted-foreground">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="p-0.5">{comment.content}</div>
        </div>
      </div>
    </div>
  );
}
