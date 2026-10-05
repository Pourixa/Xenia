import { XeniaLoadMore } from "@/components/customUI/XeniaLoadmore";
import { FollowShipTabs } from "@/components/Followships/FollowShipTabs";
import { User } from "@/components/Search/user";
import { Spinner } from "@/components/ui/spinner";
import { getRequest } from "@/lib/requests";
import { MAX_FOLLOW } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router";

export function Followships() {
  const [query,setQuery] = useSearchParams()
  const params = useParams()
  console.log(query)
  const [tab, setTab] = useState(query.get("tab") ? query.get("tab") : "followers");
  const [users, setUsers] = useState(null);
  const { isSigned, user } = useOutletContext();
  const [pag, setPag] = useState(0);
  useEffect(() => {
      if (pag != null) {
          if (tab === "followers") {
        getRequest(`/user/${params.username}/followers?p=${pag}`).then((res) =>
          res.json().then((json) => {
            const usrs = json.map(u => u.follower)
            if (pag === 0 && json.length === 0) {
              setPag(null);
              setUsers([]);
            } else if (json.length < MAX_FOLLOW) setPag(null);
            setUsers((prev) => (pag === 0 ? usrs : [...prev, ...usrs]));
          }),
        );
      } else {
        getRequest(`/user/${params.username}/followings?p=${pag}`).then((res) =>
          res.json().then((json) => {
            const usrs = json.map(u => u.following)
            if (pag === 0 && json.length === 0) {
              setPag(null);
              setUsers([]);
            } else if (json.length < MAX_FOLLOW) setPag(null);
            setUsers((prev) => (pag === 0 ? usrs : [...prev, ...usrs]));
          }),
        );
      }
    }
  }, [tab, pag]);
  if (users === null) return <Spinner/>;
  return (
    <main className="overflow-y-auto flex flex-col items-center grow">
        <FollowShipTabs def={query.get("tab")} setUsers={setUsers} setTab={setTab} setPag={setPag}/>
          <div className="w-full">
            {users.map((usr, idx) => {

                return <User user={usr} key={crypto.randomUUID()}/>
            })}
          </div>
          <XeniaLoadMore setPag={setPag} pag={pag} list={users} />
        </main>
      );
}