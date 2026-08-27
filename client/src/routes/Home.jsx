import { HomeTabs } from "@/components/customUI/HomeTabs";
import { Footer } from "@/components/Home/Footer";
import { Header } from "@/components/Home/Header";
import { Post } from "@/components/Home/Post";
import { getRequest } from "@/lib/requests";
import { useState, createContext, useContext, useEffect } from "react";
import { Outlet, useOutlet, useOutletContext } from "react-router";

export const SelectedContext = createContext(null);

export function HomeTab() {
  const { setSelected } = useContext(SelectedContext);
  const {user} = useOutletContext()
  const [tab, setTab] = useState("fy");
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    setSelected("home");
    if (tab === "fy") {
      getRequest("/post").then((res) =>
        res.json().then((json) => {
          setPosts(json);
        }),
      );
    } else {
      getRequest("/post/following?id="+user.id).then((res) =>
        res.json().then((json) => {
          setPosts(json);
        }),
      );
    }
  }, [setSelected, tab]);
  if(posts === null) 
    return <span>Loading</span>
  return <main className="overflow-auto flex flex-col items-center grow">
    <HomeTabs setTab={setTab}/>
    <div className="last:border-b-none ">
      {posts.map((pst) => {
        return <Post post={pst} key={pst.id}/>
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
  }, [])
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
