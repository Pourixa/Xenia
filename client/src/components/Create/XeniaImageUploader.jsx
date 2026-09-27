import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Image } from "lucide-react"
import { Input } from "../ui/input"

export function XeniaImageUploader() {
  return (
    <label >
        <Image className="active:fill-foreground   active:stroke-primary"/>
        <Input multiple className={"hidden"} type='file' accept='.jpeg;.png;.jpg;.webp'/>
        </label>
  )
}