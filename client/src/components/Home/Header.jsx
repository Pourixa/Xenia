import { Bell } from "lucide-react";
import { XeniaAvatar } from "../customUI/XeniaAvatar";
import { XeniaLogoNoName } from "../customUI/XeniaLogoNoName";

export function Header() {
    return <header className="border-b-2 flex justify-between items-center p-1 pl-5 pr-5">
        <XeniaAvatar size="sm"/>
        <XeniaLogoNoName width={56} height={56}/>
        <Bell width={24} height={24}/>
    </header>
}