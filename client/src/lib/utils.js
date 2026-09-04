import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { postRequest } from "./requests";

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
  if (idx < 0) {
    if (post.isLiked) {
      const res = await postRequest(`/post/${post.id}/unlike`);
      if (res.ok) {
        setPost((prev) => ({
          ...prev,
          isLiked: false,
          _count: {
            ...prev._count,
            likes: prev._count.likes - 1,
          },
        }));
      }
    } else {
      const res = await postRequest(`/post/${post.id}/like`);
      if (res.ok) {
        setPost((prev) => ({
          ...prev,
          isLiked: true,
          _count: {
            ...prev._count,
            likes: prev._count.likes + 1,
          },
        }));
      }
    }
  } else {
    if (post.isLiked) {
      const res = await postRequest(`/post/${post.id}/unlike`);
      if (res.ok) {
        setPost(
          prev => {
            const a = [...prev]
            a[idx] = {
              ...post,
              isLiked : false,
               _count: {
            ...a[idx]._count,
            likes: a[idx]._count.likes - 1,
          },
            }
            return a
          }
        );
      }
    } else {
      const res = await postRequest(`/post/${post.id}/like`);
      if (res.ok) {
        setPost(
          prev => {
            const a = [...prev]
            a[idx] = {
              ...post,
              isLiked : true,
               _count: {
            ...a[idx]._count,
            likes: a[idx]._count.likes + 1,
          },
            }
            return a
          }
        );
      }
    }
  }
}
