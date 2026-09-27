import { XSquareIcon } from "lucide-react";
import { useState } from "react";

export function XeniaImage({src,setFiles}) {
  const [show , setShow] = useState(false)
  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="relative aspect-square w-full overflow-hidden">
        {show && <XSquareIcon onClick={() => {
            setFiles(prev => {
                const arr = [...prev];
                const idx = arr.findIndex(f => f.url === src)
                arr.splice(idx,1);
                return arr
            })
        }} className="fill-destructive stroke-foreground absolute right-2 top-2"/>}
      <img className="block h-full w-full object-cover object-center" src={src} alt="" />
    </div>
  )
}