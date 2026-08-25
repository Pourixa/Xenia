import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "always"
})

const units = [
    ["year", 31536000, "y"],
    ["month", 2592000, "mo"],
    ["week", 604800, "w"],
    ["day", 86400, "d"],
    ["hour", 3600, "h"],
    ["minute", 60, "m"],
    ["second", 1, "s"],
]

export function timeAgo(date) {
    const seconds = (Date.now() - new Date(date).getTime()) / 1000

    for (const [unit, secondsInUnit, short] of units) {
        const value = Math.floor(seconds / secondsInUnit)

        if (value >= 1) {
            return `${value}${short}`
        }
    }

    return "now"
}