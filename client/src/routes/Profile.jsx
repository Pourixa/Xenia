import { use, useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import { Outlet, useLocation, useNavigate, useOutletContext, useParams } from "react-router";
import { getRequest } from "@/lib/requests";
import { Post } from "@/components/Home/Post";
import { ProfileTabs } from "@/components/Profile/ProfileTabs";
import { XeniaAvatar } from "@/components/customUI/XeniaAvatar";
import { Button } from "@/components/ui/button";

export function Profile() {
  const { setSelected } = useContext(SelectedContext);
  const [edit, setEdit] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const { user , isSigned } = useOutletContext();
  const loc = useLocation()
  const params = useParams();
  const nav = useNavigate()

  function handleFollow() {}

  function handleEdit() {}

  useEffect(() => {
    async function fetchUser() {
      const r = await getRequest(`/user/${params.username}`);
      const profileInfo = await r.json();
      setProfileUser(profileInfo);
      if (user?.username === profileInfo.username) {
        setSelected("profile");
      } else {
        setSelected({
          selected: "user",
          name: profileInfo.name,
        });
      }
    }

    fetchUser();
  }, [params.username, user, setSelected]);
  if (!profileUser) return <>loading</>;
  return (
    <main className="grow">
      <div className="p-4 border-b-2 flex flex-col gap-2 ">
        <div className="flex justify-between">
          <div className="flex gap-2 flex-wrap">
            <XeniaAvatar
              imageSrc={profileUser.avatarUrl}
              name={profileUser.name}
              size="lg"
            />
            <div className="flex flex-col">
              <span>{profileUser.name}</span>
              <span className="text-muted-foreground">
                @{profileUser.username}
              </span>
            </div>
          </div>
          {isSigned ? user.username === profileUser.username ? (
            <Button onClick={() => handleEdit()}>Edit Profile</Button>
          ) : (
            <Button onClick={() => handleFollow()}>Follow</Button>
          ) : <Button onClick={() => nav("/user/signin")}>Sign in to Follow</Button>}
        </div>
        <div>{profileUser.about}</div>
        <div className="flex gap-4">
          <span>
            <span className="font-bold">{profileUser._count.posts}</span> Posts
          </span>
          <span>
            <span className="font-bold">{profileUser._count.followings}</span>{" "}
            Following
          </span>
          <span>
            <span className="font-bold">{profileUser._count.followers}</span>{" "}
            Followers
          </span>
        </div>
      </div>
      <div>
        <ProfileTabs state={loc.state}/>
        <Outlet />
      </div>
    </main>
  );
}
