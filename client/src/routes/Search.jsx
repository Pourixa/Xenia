import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import { Input } from "@/components/ui/input";
import { SearchIcon, SearchX } from "lucide-react";
import { postRequest } from "@/lib/requests";
import { User } from "@/components/Search/user";
import { XeniaEmpty } from "@/components/customUI/XeniaEmpty";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { XeniaLoadMore } from "@/components/customUI/XeniaLoadmore";

export function Search() {
  const { setSelected } = useContext(SelectedContext);
  const [searchParams,setSearchParams] = useSearchParams()
  const q = searchParams.get("s")
  const [text,setText] = useState(q ? q : "")
  const [result,setResult] = useState([])
  const [pag,setPag] = useState(0)
useEffect(() => {
  setSelected("search");

  if (!text.length) {
    setResult([]);
    return;
  }
  if(pag!=null)
  postRequest("/user/search", {
    q: text,
    p: pag
  })
    .then(r => r.json())
    .then(j => {
      if(j.length === 0)
        setPag(null)
      setResult(prev => pag === 0 ? j : [...prev, ...j]);
    });
}, [pag, text]);
  return <main className="grow overflow-auto flex flex-col">
    <div className="z-999 bg-background p-4 border-b sticky top-0">
      <div className=" flex border items-center p-1 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 ">
          <Input onChange={e => {setText(e.target.value);setSearchParams({s:e.target.value});}} value={text} className={"border-0 focus-visible:ring-0"}  placeholder="Type to search..." />
          <span ><SearchIcon/></span>
      </div>
    </div>
    <div >
      {result.length > 0 ? result.map((user) => {
        return <User user={user} key={user.username}/>
      }) :  <XeniaEmpty HeaderIcon={<SearchX />} title={"No results found"} />}
    </div>
    <XeniaLoadMore pag={pag} setPag={setPag} list={result}/>
  </main>
}
