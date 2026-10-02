import { useContext, useEffect, useRef, useState } from "react";
import { SelectedContext } from "./Home";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import XeniaEmojiPicker from "@/components/Create/EmojiPicker";
import { Separator } from "@/components/ui/separator";
import {useNavigate, useOutletContext } from "react-router";
import { postRequest } from "@/lib/requests";
import { XeniaImageUploader } from "@/components/Create/XeniaImageUploader";
import { XeniaImage } from "@/components/Create/XeniaImage";

const MAX_LENGTH = 280;
export function Create() {
  const [files, setFiles] = useState([]);
  const preview = useRef();
  const { setSelected } = useContext(SelectedContext);
  const {user,isSigned}= useOutletContext()
  const nav = useNavigate()
  const [text, setText] = useState("");
  async function handleClick() {
    if(isSigned)
    {
      console.log(files)
      const formData = new FormData();
      formData.append("content",text)
      files.forEach((file) => {
        formData.append("images",file.f)
      }) 
      const res = await postRequest("/post",formData)
      console.log(res)
      const post = await res.json();
      nav(`/${user.username}/post/${post.id}`)
    }
    else {
      nav("/signin")
    }
  }
  useEffect(() => {
    setSelected("create");
  }, [setSelected]);
  return (
    <main className="grow overflow-y-auto">
      <div className="p-4 grid w-full gap-2 border-b">
        <div className="grid gap-2 border focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 ">
          <Textarea
            value={text}
            className={
              "resize-none overflow-auto max-h-[36vh] border-0 focus-visible:ring-0"
            }
            maxLength={MAX_LENGTH}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="What's on your mind?"
          />
            {(files.length > 0 && <div className="border border-border gap-2 m-2 p-2 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))]" ref={preview}>
              {files.map((f,idx) => {
                return <XeniaImage setFiles={setFiles} src={f.url} key={idx}/>
              })}
            </div>)}
          <Separator className={"justify-self-center h-px w-[95%]"} />
          <div className=" flex items-center p-1  justify-between pl-4 pr-4">
            <div className="flex gap-2">
              <XeniaEmojiPicker setText={setText} maxLength={MAX_LENGTH} />
              <XeniaImageUploader files={files} setFiles={setFiles}/>
            </div>
            <span>
              {text.length} / {MAX_LENGTH}
            </span>
          </div>
        </div>
        <Button disabled={isSigned && text.length <= 0} onClick={() => handleClick()}>{isSigned ? "Post" : "Sign in to Post"}</Button>
      </div>
    </main>
  );
}
