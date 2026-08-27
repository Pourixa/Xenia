import { XeniaAvatar } from "../customUI/XeniaAvatar";
import { XeniaLogoNoName } from "../customUI/XeniaLogoNoName";
import { NotificationBell } from "../customUI/NotificationBell";
import { SelectedContext } from "@/routes/Home";
import { useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function Header({ username, notifications, imageSrc, name }) {
  const { selected } = useContext(SelectedContext);
  console.log(selected)
  const nav = useNavigate();
  if (selected.selected === "post") {
        return (
      <div className="flex p-4 border-b w-full">
        <ArrowLeft className="mr-8" onClick={() => nav(selected.path)} />
        <span className="font-bold">
          Post
        </span>
      </div>
    );
  } else if (selected.selected === "user") {
        return <div className="flex p-4 border-b w-full">
        <ArrowLeft className="mr-8" onClick={() => history.back()} />
        <span className="font-bold">
          {selected.name}
        </span>
      </div>
  } else {
    return (
      <header className="sticky bg-background z-999 top-0 border-b-2 flex justify-between items-center p-1 pl-5 pr-5">
        <Link to={`/${username}`}>
          <XeniaAvatar size="lg" imageSrc={imageSrc} name={name} />
        </Link>
        <XeniaLogoNoName width={56} height={56} />
        <NotificationBell unreadNotifications={notifications} />
      </header>
    );
  }
}
