import { HomeTabs } from "@/components/Home/HomeTabs";
import { Footer } from "@/components/Home/Footer";
import { Header } from "@/components/Home/Header";
import { Post } from "@/components/Home/Post";
import { getRequest } from "@/lib/requests";
import { useState, createContext, useContext, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router";
import { Button } from "@/components/ui/button";

export const SelectedContext = createContext(null);

export function HomeTab() {
  const { setSelected } = useContext(SelectedContext);
  const [tab, setTab] = useState("fy");
  const [posts, setPosts] = useState([]);
  const {isSigned , user} = useOutletContext()
  const [pag,setPag] = useState(0)
  useEffect(() => {
    setSelected("home");
    if (tab === "fy") {
      getRequest("/post"+(pag === null ? "" : "?p="+pag)).then((res) =>
        res.json().then((json) => {
          if (isSigned) json.map(pst => pst.isLiked = pst.likes.length > 0);
          if(json.length === 0 ) setPag(null)
          setPosts(prev => [...prev , ...json]);
        }),
      );
    } else {
      getRequest("/post/following?id="+user.id+(pag === null ? "" : "&p="+pag)).then((res) =>
        res.json().then((json) => {
          if (isSigned) json.map(pst => pst.isLiked = pst.likes.length > 0);
          if(json.length === 0 ) setPag(null)
          setPosts(prev => [...prev , ...json])
        }),
      );
    }
  }, [tab,pag]);
  if(posts === null) 
    return <span>Loading</span>
  return <main className="overflow-y-auto flex flex-col items-center grow">
    <HomeTabs setTab={setTab} setPosts={setPosts} setPag={setPag} isSigned={isSigned}/>
    <div className="max-w-dvw">
      {posts.map((pst,idx) => {
        return <Post isSigned={isSigned} setPosts={setPosts} idx={idx} post={pst} key={crypto.randomUUID()}/>
      })}
    </div>
    {(pag != null && <Button className={"m-2"} onClick={() => {
      setPag(prev => prev + 1)
    }}>Load More</Button>)}
  </main>;
}

export function Home() {
  const [selected, setSelected] = useState("home");
  const [user,setUser] = useState(null)
  const [isSigned,setIsSigned] = useState(null)
  useEffect(() => {
    getRequest("/user").then(res => res.json().then(j => {
      setUser(j.user)
      setIsSigned(j.isSigned)
    }))
  }, [selected])
  if(!user && isSigned==null) 
    return <>
    Loading
    </>
  return (
    <div className="flex flex-col h-dvh">
      <SelectedContext value={{ selected, setSelected }}>
        <Header isSigned={isSigned} notifications={user?._count.notifications ?? 0} imageSrc={user?.avatarUrl ?? null} name={user?.name ?? ""} username={user?.username ?? ""}/>
        <Outlet context={{user,isSigned}}/>
        <Footer />
      </SelectedContext>
    </div>
  );
}
