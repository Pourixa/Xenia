import { timeAgo } from "@/lib/utils";
import { Link, useLocation } from "react-router";

export function Like({ like }) {
  const loc = useLocation()
  return (
    <div className="flex border-b pl-4 pr-4 pt-1 pb-1">
      {/* <Link to={`/${like.liker.username}`} className="p-0.5" draggable={false}>
        <XeniaAvatar
          imageSrc={like.liker.avatarUrl}
          size="lg"
          name={like.liker.name}
        />
      </Link> */}
      <div>
        <div className="flex gap-1 flex-wrap gap-y-0">
          <Link
            to={`/${like.liker.username}`}
            draggable={false}
            state={{
              from:loc.pathname
            }}
            className="flex-wrap flex gap-1 gap-y-0 p-0.5"
          >
            <span className="font-bold">{like.liker.name}</span>
            {/* <span className="text-muted-foreground">
              @{like.liker.username}
            </span> */}
          </Link>
          <span>Liked</span>
          <Link
            to={`/${like.post.author.username}`}
            state={{
              from:loc.pathname
            }}
            draggable={false}
            className="flex-wrap flex gap-1 gap-y-0 p-0.5"
          >
            <span className="text-muted-foreground font-bold">
              {like.post.author.name}
            </span>
            <span className="text-muted-foreground">
              @{like.post.author.username}
              <span className="text-foreground">'s</span>
            </span>
          </Link>
          <Link
            className="underline underline-offset-4 hover:text-primary text-center font-bold"
            state={{
              from:loc.pathname
            }}
            to={`/${like.post.author.username}/post/${like.post.id}`}
          >
            Post
          </Link>
          <span>·</span>
          <span className="text-muted-foreground">
            {timeAgo(like.createdAt)}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="p-0.5">{like.content}</div>
        </div>
      </div>
    </div>
  );
}
