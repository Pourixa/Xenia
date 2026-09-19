import { HomeTabs } from "@/components/Home/HomeTabs";
import { Footer } from "@/components/Home/Footer";
import { Header } from "@/components/Home/Header";
import { Post } from "@/components/Home/Post";
import { getRequest } from "@/lib/requests";
import { useState, createContext, useContext, useEffect } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router";

export const SelectedContext = createContext(null);

export function HomeTab() {
  const { setSelected } = useContext(SelectedContext);
  const [tab, setTab] = useState("fy");
  const [posts, setPosts] = useState(null);
  const {isSigned , user} = useOutletContext()
  const nav = useNavigate()
  useEffect(() => {
    setSelected("home");
    if (tab === "fy") {
      getRequest("/post").then((res) =>
        res.json().then((json) => {
          if (isSigned) json.map(pst => pst.isLiked = pst.likes.length > 0);
          setPosts(json);
        }),
      );
    } else {
      getRequest("/post/following?id="+user.id).then((res) =>
        res.json().then((json) => {
          if (isSigned) json.map(pst => pst.isLiked = pst.likes.length > 0);
          setPosts(json);
        }),
      );
    }
  }, [setSelected, tab]);
  if(posts === null) 
    return <span>Loading</span>
  return <main className="overflow-y-auto flex flex-col items-center grow">
    <HomeTabs setTab={setTab} isSigned={isSigned}/>
    <div className="max-w-dvw">
      {posts.map((pst,idx) => {
        return <Post isSigned={isSigned} setPosts={setPosts} idx={idx} post={pst} key={pst.id}/>
      })}
    </div>
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
