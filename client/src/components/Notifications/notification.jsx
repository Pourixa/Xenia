import { timeAgo } from "@/lib/utils";
import { Link, useLocation } from "react-router";

export function Notification({ notification }) {
  const loc = useLocation();
  if (notification.eventType === "FOLLOW")
    return (
      <div
        className={
          "flex border-b pl-4 pr-4 pt-1 pb-1 relative " +
          (notification.isRead ? "" : "bg-[var(--muted-background)]")
        }
      >
        {/* <Link to={`/${notification.data.follower.username}`} className="p-0.5" draggable={false}>
        <XeniaAvatar
          imageSrc={notification.data.follower.avatarUrl}
          size="lg"
          name={notification.data.follower.name}
        />
      </Link> */}
        {!notification.isRead && (
          <span className="absolute rounded-full right-1 top-1 bg-primary w-2 h-2"></span>
        )}

        <div className="flex-1 min-w-0">
          <div className=" flex gap-1 flex-wrap gap-y-0">
            <Link
              to={`/${notification.data.follower.username}`}
              draggable={false}
              className="flex-wrap flex gap-1 gap-y-0 p-0.5"
              state={{
                from: loc.pathname,
              }}
            >
              <span className="font-bold">
                {notification.data.follower.name}
              </span>
              {/* <span className="text-muted-foreground">
              @{notification.data.follower.username}
            </span> */}
            </Link>
            <span>Followed You</span>
            <span>·</span>
            <span className="text-muted-foreground">
              {timeAgo(notification.createdAt)}
            </span>
          </div>
        </div>
      </div>
    );
  else if (notification.eventType === "COMMENT")
    return (
      <div
        className={
          "flex border-b pl-4 pr-4 pt-1 pb-1 relative " +
          (notification.isRead ? "" : "bg-[var(--muted-background)]")
        }
      >
        {/* <Link to={`/${notification.data.commenter.username}`} className="p-0.5" draggable={false}>
        <XeniaAvatar
          imageSrc={notification.data.commenter.avatarUrl}
          size="lg"
          name={notification.data.commenter.name}
        />
      </Link> */}
        {!notification.isRead && (
          <span className="absolute rounded-full right-1 top-1 bg-primary w-2 h-2"></span>
        )}

        <div className="flex-1 min-w-0">
          <div className=" flex gap-1 flex-wrap gap-y-0">
            <Link
              to={`/${notification.data.commenter.username}`}
              draggable={false}
              className="flex-wrap flex gap-1 gap-y-0 p-0.5"
              state={{
                from: loc.pathname,
              }}
            >
              <span className="font-bold">
                {notification.data.commenter.name}
              </span>
              {/* <span className="text-muted-foreground">
              @{notification.data.commenter.username}
            </span> */}
            </Link>
            <span>Commented on your</span>
            <Link
              className="underline underline-offset-4 hover:text-primary text-center font-bold"
              state={{
                from: loc.pathname,
              }}
              to={`/${notification.data.post.author.username}/post/${notification.data.post.id}?c=${notification.data.id}#comments`}
            >
              Post
            </Link>
            <span>·</span>
            <span className="text-muted-foreground">
              {timeAgo(notification.createdAt)}
            </span>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div
        className={
          "flex border-b pl-4 pr-4 pt-1 pb-1 relative " +
          (notification.isRead ? "" : "bg-[var(--muted-background)]")
        }
      >
        {/* <Link to={`/${notification.data.data.liker.username}`} className="p-0.5" draggable={false}>
        <XeniaAvatar
          imageSrc={notification.data.data.liker.avatarUrl}
          size="lg"
          name={notification.data.data.liker.name}
        />
      </Link> */}
        {!notification.isRead && (
          <span className="absolute rounded-full right-1 top-1 bg-primary w-2 h-2"></span>
        )}
        <div className="flex-1 min-w-0">
          <div className=" flex gap-1 flex-wrap gap-y-0 items-center">
            <Link
              to={`/${notification.data.data.liker.username}`}
              draggable={false}
              className="flex-wrap flex gap-1 gap-y-0 p-0.5"
              state={{
                from: loc.pathname,
              }}
            >
              <span className="font-bold">
                {notification.data.data.liker.name}
              </span>
              {/* <span className="text-muted-foreground">
              @{notification.data.data.liker.username}
            </span> */}
            </Link>
            <span>Liked your</span>
            <Link
              className="underline underline-offset-4 hover:text-primary text-center font-bold"
              state={{
                from: loc.pathname,
              }}
              to={`/${notification.data.data.post.author.username}/post/${notification.data.data.post.id}`}
            >
              Post
            </Link>
            <span>·</span>
            <span className="text-muted-foreground">
              {timeAgo(notification.createdAt)}
            </span>
          </div>
        </div>
      </div>
    );
}
