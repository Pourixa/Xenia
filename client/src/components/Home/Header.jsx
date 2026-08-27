import { XeniaAvatar } from "../customUI/XeniaAvatar";
import { XeniaLogoNoName } from "../customUI/XeniaLogoNoName";
import { NotificationBell } from "../customUI/NotificationBell";
import { SelectedContext } from "@/routes/Home";
import { useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

const explicitList = [["post", "/"]];

export function Header({ username, imageSrc, name }) {
  const { selected } = useContext(SelectedContext);
  const nav = useNavigate();
  const idx = explicitList.find((e) => e[0] === selected);
  if (!idx) {
    return (
      <header className="sticky bg-background z-999 top-0 border-b-2 flex justify-between items-center p-1 pl-5 pr-5">
        <Link to={`/${username}`}>
          <XeniaAvatar size="lg" imageSrc={imageSrc} name={name} />
        </Link>
        <XeniaLogoNoName width={56} height={56} />
        <NotificationBell unreadNotifications={0} />
      </header>
    );
  } else {
    return (
      <div className="flex p-4 border-b w-full">
        <ArrowLeft className="mr-8" onClick={() => nav(idx[1])} />
        <span className="font-bold">{selected.charAt(0).toUpperCase() + selected.slice(1)}</span>
      </div>
    );
  }
}
