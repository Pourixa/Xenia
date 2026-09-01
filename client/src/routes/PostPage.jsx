import { Comment } from "@/components/PostPage/comment";
import { Post } from "@/components/PostPage/post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getRequest, postRequest } from "@/lib/requests";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { SelectedContext } from "./Home";
import { XeniaEmpty } from "@/components/customUI/XeniaEmpty";
import { MessageSquareX } from "lucide-react";
import XeniaEmojiPicker from "@/components/Create/EmojiPicker";
import { Separator } from "@/components/ui/separator";

const MAX_LENGTH = 280;

export function PostPage() {
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");
  const { postId } = useParams();
  const { isSigned } = useOutletContext();
  const { setSelected } = useContext(SelectedContext);
  const nav = useNavigate();

  async function handleClick() {
    if (isSigned) {
      const res = await postRequest(`/post/${postId}/comment`, {
        content: text,
      });
      if (res.ok) {
        const comment = await res.json();
        setPost((prev) => ({
          ...prev,
          comments: [comment,...prev.comments],
        }));
        setText("")
      }
    } else {
      nav("/user/signin");
    }
  }

  useEffect(() => {
    setSelected({ selected: "post" });
    getRequest("/post/" + postId).then((res) => {
      res.json().then((pst) => {
        if (isSigned) pst.author.isFollowed = pst.author.followers.length > 0;
        if (isSigned) pst.isLiked = pst.likes.length > 0;
        setPost(pst);
      });
    });
  }, [setSelected]);

  if (!post) return <>Loading</>;
  return (
    <main className="overflow-auto grow">
      <div className="p-4 border-b">
        <Post setPost={setPost} post={post} isSigned={isSigned} />
      </div>
      <div>
        <div className="p-4 grid w-full gap-2 border-b">
          <div className="p-2 grid w-full gap-2 ">
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
                placeholder="What's your idea?"
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
            <Button
              disabled={text.length <= 0 && isSigned}
              onClick={() => handleClick()}
            >
              {isSigned ? "Comment" : "Sign in to comment"}
            </Button>
          </div>
        </div>
      </div>
      <div className="last:border-b-none" id="comments">
        {post.comments.length > 0 ? (
          post.comments.map((cmt) => {
            return <Comment comment={cmt} key={cmt.id} />;
          })
        ) : (
          <XeniaEmpty
            HeaderIcon={<MessageSquareX />}
            title={"No comments yet"}
          />
        )}
      </div>
    </main>
  );
}
