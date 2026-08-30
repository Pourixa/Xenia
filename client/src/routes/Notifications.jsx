import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import { getRequest } from "@/lib/requests";

export function Notifications() {
  const { setSelected } = useContext(SelectedContext);
  const [notifications , setNotifications] = useState([])
  useEffect(() => {
    setSelected("notifications");
    (() => {
      getRequest("/user/notifications")
    })
  }, [setSelected]);
  return;
}
