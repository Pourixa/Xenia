import { useContext, useEffect } from "react";
import { SelectedContext } from "./Home";

export function Notifications() {
  const { setSelected } = useContext(SelectedContext);
  useEffect(() => {
    setSelected("notifications");
  }, [setSelected]);
  return;
}
