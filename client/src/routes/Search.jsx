import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import { Input } from "@/components/ui/input";
import { SearchIcon, SearchX } from "lucide-react";
import { postRequest } from "@/lib/requests";
import { User } from "@/components/Search/user";
import { XeniaEmpty } from "@/components/customUI/XeniaEmpty";
import { useSearchParams } from "react-router";

export function Search() {
  const { setSelected } = useContext(SelectedContext);
  const [searchParams,setSearchParams] = useSearchParams()
  const q = searchParams.get("s")
  const [text,setText] = useState(q ? q : "")
  const [result,setResult] = useState([])
  useEffect(() => {
    setSelected("search");
    if(text.length > 0) {
      postRequest("/user/search",{
        q:text
      }).then((r) => r.json().then(j => setResult(j)))
    } else setResult([])
  }, [setSelected,text]);
  return <main className="grow overflow-auto">
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
  </main>
}
