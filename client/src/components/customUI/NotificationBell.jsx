import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell } from "lucide-react";

export function NotificationBell({unreadNotifications = 0}) {
            return <Avatar className={"after:border-none "}>
            <AvatarFallback className={"bg-background text-foreground"}>
                <Bell width={24} height={24}/>
            </AvatarFallback>
            {unreadNotifications >= 1 && <AvatarBadge className={"top-0 translate-x-2 -translate-y-2 p-3"}>
                {unreadNotifications <= 99 ? unreadNotifications : ":D"}
            </AvatarBadge>}
        </Avatar>
}