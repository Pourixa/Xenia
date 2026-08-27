import { use, useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import { useOutletContext, useParams } from "react-router";
import { getRequest } from "@/lib/requests";

export function Profile() {
  const { setSelected } = useContext(SelectedContext);
  const [profileUser, setProfileUser] = useState(null);
  const { user, isSigned } = useOutletContext();
  const params = useParams();
  useEffect(() => {
    async function fetchUser() {
      const r = await getRequest(`/user/${params.username}`);
      const profile = await r.json();

      setProfileUser(profile);

      if (user?.username === profile.username) {
        setSelected("profile");
      } else {
        setSelected({
          selected: "user",
          name: profile.name,
        });
      }
    }

    fetchUser();
  }, [params.username, user, setSelected]);
  console.log(profileUser);
  return <></>;
}
