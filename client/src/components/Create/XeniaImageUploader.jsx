import { Image } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

export function XeniaImageUploader({ files, setFiles }) {
  const [disabled, setDisabled] = useState(files ? files.length >= 4 : false);
  useEffect(() => {
    setDisabled(files.length>=4)
  },[files])
  function handleFiles(e) {
    if (files) {
      if (files.length + e.files.length > 4) return ;
      const list = Array.prototype.filter.call(
        e.files,
        (file) => file.type.includes("image") && file.size < 10_000_000,
      );
      setFiles((prev) => [...prev, ...list.map((f) => ({f:f,url:URL.createObjectURL(f)}))]);
    } else {
      if (e.files.length > 4) return ;
      const list = Array.prototype.filter.call(
        e.files,
        (file) => file.type.includes("image") && file.size < 10_000_000,
      );
      setFiles(list.map((f) => ({f:f,url:URL.createObjectURL(f)})));
    }
  }
  if (disabled) return <Image className="stroke-muted-foreground" />;
  else
    return (
      <label>
        <Image className="active:fill-foreground active:stroke-primary" />
        <Input
          multiple
          className={"hidden"}
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/webp"
          onChange={(e) => handleFiles(e.target)}
        />
      </label>
    );
}
