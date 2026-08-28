import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useContext, useMemo } from "react";
import { Style, Avatar as DiceBearAvatar } from "@dicebear/core";
import lineFace from "@dicebear/styles/line-face.json" with { type: "json" };
const style = new Style(lineFace);

export function XeniaAvatar({ size = "default", imageSrc = null, name = "" , className=""}) {
  return (
    <Avatar
      size={size}
      className={`${className}`}
    >
      <AvatarImage src={imageSrc} alt={name}></AvatarImage>
      <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
}
