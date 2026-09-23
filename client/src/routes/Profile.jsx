import { use, useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import { getRequest, patchRequest, postRequest } from "@/lib/requests";
import { ProfileTabs } from "@/components/Profile/ProfileTabs";
import { XeniaAvatar } from "@/components/customUI/XeniaAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Profile() {
  const { setSelected } = useContext(SelectedContext);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    avatarUrl: null,
    name: null,
    username: null,
    bio: null,
  });
  const [profileUser, setProfileUser] = useState(null);
  const { user, isSigned } = useOutletContext();
  const loc = useLocation();
  const params = useParams();
  const nav = useNavigate();

  async function handleFollowUnfollow() {
    if (!profileUser.isFollowed) {
      const res = await postRequest(`/user/${profileUser.username}/follow`, {
        id: profileUser.id,
      });
      if (res.ok) setProfileUser((prev) => ({ ...prev, isFollowed: true }));
    } else {
      const res = await postRequest(`/user/${profileUser.username}/unfollow`, {
        id: profileUser.id,
      });
      if (res.ok) setProfileUser((prev) => ({ ...prev, isFollowed: false }));
    }
  }

  async function handleEdit() {
    const res = await patchRequest("/user/editprofile", data);
    if (res.ok) {
      setEdit(false);
      setProfileUser((prev) => ({
        ...prev,
        about: data.bio,
        name: data.name,
        username: data.username.toLowerCase(),
        avatarUrl: data.avatarUrl,
      }));
      nav(`/${data.username.toLowerCase()}`);
    } else {
      console.log(res.json());
    }
  }

  useEffect(() => {
    async function fetchUser() {
      const r = await getRequest(`/user/${params.username}`);
      const profileInfo = await r.json();
      setData({
        username: profileInfo.username,
        avatarUrl: profileInfo.avatarUrl,
        name: profileInfo.name,
        bio: profileInfo.about ? profileInfo.about : "",
      });
      if (isSigned) profileInfo.isFollowed = profileInfo.followers.length > 0;
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
  }, [params.username]);
  if (!profileUser) return <>loading</>;
  console.log(profileUser);
  return (
    <main className="overflow-y-auto flex flex-col  grow">
      <div className="p-4 border-b-2 flex flex-col gap-2 ">
        {!edit ? (
          <div className="flex justify-between gap-4">
            <div className="flex min-w-0 gap-2 flex-wrap">
              <XeniaAvatar
                imageSrc={profileUser.avatarUrl}
                name={profileUser.name}
                size="lg"
              />
              <div className="flex min-w-0 flex-col">
                <span>{profileUser.name}</span>
                <span className="text-muted-foreground">
                  @{profileUser.username}
                </span>
                <div className="w-full min-w-0 wrap-break-word">
                  {profileUser.about}
                </div>
              </div>
            </div>
            {isSigned ? (
              user.username === profileUser.username ? (
                <Button onClick={() => setEdit(true)}>Edit Profile</Button>
              ) : (
                <Button onClick={() => handleFollowUnfollow()}>
                  {profileUser.isFollowed ? "Unfollow" : "Follow"}
                </Button>
              )
            ) : (
              <Button onClick={() => nav("/signin")}>Sign in to Follow</Button>
            )}
          </div>
                   
        ) : (
          <div className="flex justify-between">
            <div className="flex gap-2 flex-wrap">
              <div>
                <XeniaAvatar
                  imageSrc={profileUser.avatarUrl}
                  name={profileUser.name}
                  size="lg"
                />
                <label>
                  Avatar URL
                  <Input
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        avatarUrl: e.target.value,
                      }))
                    }
                    value={data.avatarUrl}
                    type="url"
                    placeholder="Avatar URL"
                  />
                </label>
              </div>
              <div className="flex flex-col">
                <label>
                  Name
                  <Input
                    minLength={1}
                    maxLength={39}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    value={data.name}
                  />
                </label>
                <label>
                  Username
                  <Input
                    minLength={1}
                    maxLength={39}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    value={data.username}
                  />
                </label>
                <label>
                  Bio
                  <Textarea
                    minLength={0}
                    maxLength={180}
                    className={
                      "max-h-[30vh] resize-none overflow-y-auto whitespace-pre-wrap wrap-break-word"
                    }
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    value={data.bio}
                  />
                </label>
              </div>
            </div>

            <Button onClick={() => handleEdit()}>Save</Button>
          </div>
        )}
        {!edit && ( <div className="flex gap-4">
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
        </div>)}
      </div>
      <div>
        <ProfileTabs state={loc.state} />
        <Outlet context={{ profileUser: profileUser, isSigned: isSigned }} />
      </div>
    </main>
  );
}
