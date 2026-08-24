import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMemo } from "react";
import { Style, Avatar as DiceBearAvatar } from "@dicebear/core";
import lineFace from "@dicebear/styles/line-face.json" with { type: "json" };
const style = new Style(lineFace);

export function XeniaAvatar({
  size = "default",
  imageSrc = null,
  alt = "",
  name = "",
}) {
  const generatedAvatar = useMemo(() => {
    return new DiceBearAvatar(style, {
      seed:name,
      size: 128,
    }).toDataUri();
  }, [name]);
  const avatar = imageSrc ?? generatedAvatar;
  return (
    <Avatar size={size}>
      <AvatarImage src={avatar} alt={alt}></AvatarImage>
      <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
}
