import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import { getRequest } from "@/lib/requests";

export function Notifications() {
  const { setSelected } = useContext(SelectedContext);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setSelected("notifications");
      (async () => {
        const res = await getRequest("/user/notifications");
        if (res.ok) {
          const js = await res.json();
          setNotifications(js);
          console.log(js);
        }
      })();
  }, [setSelected]);
  return;
}
