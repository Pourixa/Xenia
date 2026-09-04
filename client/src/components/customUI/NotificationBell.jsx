import { SelectedContext } from "@/routes/Home";
import { Avatar, AvatarBadge, AvatarFallback } from "../ui/avatar";
import { Bell } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";

export function NotificationBell({ unreadNotifications = 0 }) {
  const { selected } = useContext(SelectedContext);
  const nav = useNavigate()
  return (
    <Avatar onClick={() => {nav("/notifications")}} className={"after:border-none hover:cursor-pointer"}>
      <AvatarFallback className={"bg-background text-foreground"}>
        <Bell width={24} height={24} className={(selected === "notifications" ? "fill-foreground" : "")} />
      </AvatarFallback>
      {unreadNotifications >= 1 && (
        <AvatarBadge className={"top-0 translate-x-2 -translate-y-2 p-3"}>
          {unreadNotifications <= 99 ? unreadNotifications : ":D"}
        </AvatarBadge>
      )}
    </Avatar>
  );
}
