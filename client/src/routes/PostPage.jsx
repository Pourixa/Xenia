import { Comment } from "@/components/PostPage/comment";
import { Post } from "@/components/PostPage/post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getRequest } from "@/lib/requests";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { SelectedContext } from "./Home";

export function PostPage() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  
  const { setSelected } = useContext(SelectedContext);


  useEffect(() => {
    setSelected("post");
    getRequest("/post/" + postId).then((res) => {
      res.json().then((pst) => {
        setPost(pst);
      });
    });
  }, [setSelected]);
  console.log(post);
  if (!post) return <>Loading</>;
  return (
    <main className="overflow-auto grow">
      <div className="p-4 border-b">
        <Post post={post} />
      </div>
      <div>
        <div className="p-4 grid w-full gap-2 border-b">
          <Textarea placeholder="Type your comment here." />
          <Button>Add comment</Button>
        </div>
      </div>
        <div className="last:border-b-none ">
            {post.comments.map((cmt) => {
            return <Comment comment={cmt} key={cmt.id}/>
            })}
        </div>
    </main>
  );
}
