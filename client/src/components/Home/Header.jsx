import { XeniaAvatar } from "../customUI/XeniaAvatar";
import { XeniaLogoNoName } from "../customUI/XeniaLogoNoName";
import { NotificationBell } from "../customUI/NotificationBell";

export function Header() {
    return <header className="border-b-2 flex justify-between items-center p-1 pl-5 pr-5">
        <XeniaAvatar size="lg"/>
        <XeniaLogoNoName width={56} height={56}/>
        <NotificationBell unreadNotifications={0}/>
    </header>
}