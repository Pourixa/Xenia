import { timeAgo } from "@/lib/utils";
import { Link } from "react-router";

export function Comment({ comment }) {
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
        <div className="flex gap-1 flex-wrap">
          <Link
            to={`/${comment.commenter.username}`}
            draggable={false}
            className="flex-wrap flex gap-1 gap-y-0 p-0.5"
          >
            <span>{comment.commenter.name}</span>
            {/* <span className="text-muted-foreground">
              @{comment.commenter.username}
            </span> */}
          </Link>
          <span>Commented on</span>
          <Link
            to={`/${comment.post.author.username}`}
            draggable={false}
            className="flex-wrap flex gap-1 gap-y-0 p-0.5"
          >
            <span className="text-muted-foreground">
              {comment.post.author.name}
            </span>
            <span className="text-muted-foreground">
              @{comment.post.author.username}
              <span className="text-foreground">'s</span>
            </span>
          </Link>
          <Link
            className="underline underline-offset-4 hover:text-primary text-center"
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
