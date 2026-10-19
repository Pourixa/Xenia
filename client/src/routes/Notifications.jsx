import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import { getRequest, patchRequest } from "@/lib/requests";
import { XeniaEmpty } from "@/components/customUI/XeniaEmpty";
import { BellOff } from "lucide-react";
import { Notification } from "../components/Notifications/notification";
import { toast } from "@/components/ui/toast";
import { useNavigate, useOutletContext } from "react-router";
import { Button } from "@/components/ui/button";
export function Notifications() {
  const { setSelected } = useContext(SelectedContext);
  const [notifications, setNotifications] = useState([]);
  const { isSigned } = useOutletContext()
  const nav = useNavigate()
  useEffect(() => {
    setSelected("notifications");
    (async () => {
      if(!isSigned)
        return
      try {
        const res = await getRequest("/user/notifications");
        if (res.ok) {
          const js = await res.json();
          setNotifications(js.notifs);
          if (js.count > 0)
            await patchRequest("/user/readNotifications", {
              notificationsID: js.notifs.map((n) => n.id),
            });
        }
        else 
          throw new Error((await res.json()).msg)
      } catch {
        toast.add({
          title: "Failed to fetch notifications !",
          type: "error",
        });
      }
    })();
  }, [setSelected]);
  if(!isSigned)
    return <div className={"h-full flex flex-col justify-center items-center"}>
      <Button onClick={() => nav("/signin")}>
        Signin to view your notifications
      </Button>
    </div>
  return (
    <div className="overflow-auto flex flex-col items-center grow w-full">
      <div className="w-full">
        {notifications.length > 0 ? (
          notifications.map((notif) => {
            return <Notification notification={notif} key={notif.id} />;
          })
        ) : (
          <XeniaEmpty
            HeaderIcon={<BellOff />}
            title={"No notifications by this user"}
          />
        )}
      </div>
    </div>
  );
}
