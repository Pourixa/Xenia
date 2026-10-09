import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { postRequest } from "./requests";
import { toast } from "@/components/ui/toast";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const units = [
  ["year", 31536000, "y"],
  ["month", 2592000, "mo"],
  ["week", 604800, "w"],
  ["day", 86400, "d"],
  ["hour", 3600, "h"],
  ["minute", 60, "m"],
  ["second", 1, "s"],
];

export function timeAgo(date) {
  const seconds = (Date.now() - new Date(date).getTime()) / 1000;

  for (const [unit, secondsInUnit, short] of units) {
    const value = Math.floor(seconds / secondsInUnit);

    if (value >= 1) {
      return `${value}${short}`;
    }
  }

  return "now";
}

export async function handleLikeUnLike(post, setPost, idx = -1) {
  const isPostLiked = post.isLiked;
  const action = isPostLiked ? "unlike" : "like";
  try {
    if (idx < 0) {
      const res = await postRequest(`/post/${post.id}/${action}`);
      if (res.ok) {
        setPost((prev) => ({
          ...prev,
          isLiked: isPostLiked ? false : true,
          _count: {
            ...prev._count,
            likes: isPostLiked ? a[idx]._count.likes - 1 : a[idx]._count.likes + 1,
          },
        }));
      } else 
        throw new Error()
    } else {
      const res = await postRequest(`/post/${post.id}/${action}`);
      if (res.ok) {
        setPost((prev) => {
          const a = [...prev];
          a[idx] = {
            ...post,
            isLiked: isPostLiked? false : true,
            _count: {
              ...a[idx]._count,
              likes: isPostLiked ? a[idx]._count.likes - 1 : a[idx]._count.likes + 1 ,
            },
          };
          return a;
        });
      } else {
        throw new Error()
      }
    }
  } catch {
    toast.add({
      title:`${isPostLiked ? "Unlike" : "Like"} failed`
    })
  }
}

export const MAX_POSTS = 20;
export const MAX_LIKES = 20;
export const MAX_COMMENTS = 20;
export const MAX_NOTIFS = 20;
export const MAX_SEARCH = 20;
export const MAX_FOLLOW = 20;
