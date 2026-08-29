import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import XeniaEmojiPicker from "@/components/Create/EmojiPicker";
import { Separator } from "@/components/ui/separator";
import {useNavigate, useOutletContext } from "react-router";

const MAX_LENGTH = 280;
export function Create() {
  const { setSelected } = useContext(SelectedContext);
  const {user,isSigned}= useOutletContext()
  const nav = useNavigate()
  const [text, setText] = useState("");

  function handleClick() {
    if(isSigned)
    {
      //post
    }
    else {
      nav("/user/signin")
    }
  }

  useEffect(() => {
    setSelected("create");
  }, [setSelected]);
  return (
    <main className="grow">
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
          <Separator className={"justify-self-center h-px w-[95%]"} />
          <div className=" flex items-center p-1  justify-between pl-4 pr-4">
            <div>
              <XeniaEmojiPicker setText={setText} maxLength={MAX_LENGTH} />
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
