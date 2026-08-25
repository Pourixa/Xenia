import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useContext, useMemo } from "react";
import { Style, Avatar as DiceBearAvatar } from "@dicebear/core";
import lineFace from "@dicebear/styles/line-face.json" with { type: "json" };
import { SelectedContext } from "@/routes/Home";
import { useNavigate } from "react-router";
const style = new Style(lineFace);

export function XeniaAvatar({ size = "default", imageSrc = null, name = "" }) {
  const generatedAvatar = useMemo(() => {
    return new DiceBearAvatar(style, {
      seed: name,
      size: 128,
    }).toDataUri();
  }, [name]);
  const avatar = imageSrc ?? generatedAvatar;
  const { selected } = useContext(SelectedContext);
  const nav = useNavigate();
  return (
    <Avatar
      size={size}
      className={`${selected === "profile" ? "ring-2" : ""}`}
    >
      <AvatarImage src={avatar} alt={name}></AvatarImage>
      <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
}
