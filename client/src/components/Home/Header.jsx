import { XeniaAvatar } from "../customUI/XeniaAvatar";
import { XeniaLogoNoName } from "../customUI/XeniaLogoNoName";
import { NotificationBell } from "../customUI/NotificationBell";
import { SelectedContext } from "@/routes/Home";
import { useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
const  guest = "guest.png"

export function Header({ isSigned,  username, notifications, imageSrc, name }) {
  const { selected } = useContext(SelectedContext);
  const nav = useNavigate();
  if (selected?.selected === "post") {
        return (
      <div className="flex p-4 border-b w-full">
        <ArrowLeft className="mr-8 hover:cursor-pointer" onClick={() => nav(-1)} />
        <span className="font-bold">
          Post
        </span>
      </div>
    );
  } else if (selected?.selected === "user") {
        return <div className="flex p-4 border-b w-full">
        <ArrowLeft className="mr-8 hover:cursor-pointer" onClick={() => nav(-1)} />
        <span className="font-bold">
          {selected.name}
        </span>
      </div>
  } else {
    return (
      <header className="sticky bg-background z-999 top-0 border-b-2 flex justify-between items-center p-1 pl-5 pr-5">
        <Link to={isSigned ? `/${username}` : "/user/signin"}>
          <XeniaAvatar className={selected === "profile" ? "ring-2" : ""} size="lg" imageSrc={isSigned ? imageSrc : guest} name={isSigned ? name : "G"} />
        </Link>
        <XeniaLogoNoName width={56} height={56} />
        <NotificationBell unreadNotifications={notifications} />
      </header>
    );
  }
}
