import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import { getRequest, patchRequest } from "@/lib/requests";
import { XeniaEmpty } from "@/components/customUI/XeniaEmpty";
import { BellOff } from "lucide-react";
import {Notification} from "../components/Notifications/notification"
export function Notifications() {
  const { setSelected } = useContext(SelectedContext);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setSelected("notifications");
      (async () => {
        const res = await getRequest("/user/notifications");
        if (res.ok) {
          const js = await res.json();
          setNotifications(js.notifs);
          if(js.count > 0)
          await patchRequest("/user/readNotifications",{notificationsID : js.notifs.map(n => n.id)})
          console.log(js);
        }
      })();
  }, [setSelected]);
  return <div className="overflow-auto flex flex-col items-center grow w-full">
        <div className="w-full">
          {notifications.length > 0 ? notifications.map((notif) => {
            return <Notification notification={notif} key={notif.id}/>
          }) : <XeniaEmpty HeaderIcon={<BellOff/>} title={"No notifications by this user"}/>}
        </div>
      </div>
}
