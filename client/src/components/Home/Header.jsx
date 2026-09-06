import { XeniaAvatar } from "../customUI/XeniaAvatar";
import { XeniaLogoNoName } from "../customUI/XeniaLogoNoName";
import { NotificationBell } from "../customUI/NotificationBell";
import { SelectedContext } from "@/routes/Home";
import { useContext, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
const guest = "guest.png";

export function Header({ isSigned, username, notifications, imageSrc, name }) {
  const { selected } = useContext(SelectedContext);
  const [breadCrumb, setBreadCrumb] = useState([]);
  const loc = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (loc.state?.from) {
      const from = loc.state?.from;
      if (!from || breadCrumb.at(-1) === from) return;

      setBreadCrumb((prev) => [...prev, from]);
    }
  }, [loc.state]);
  if ((loc.pathname === "/signin" | loc.pathname === "/signup")) {
    return;
  } else if (selected?.selected === "post") {
    return (
      <header className="flex p-4 border-b w-full">
        <ArrowLeft
          className="mr-8 hover:cursor-pointer"
          onClick={() => {
            const previous = breadCrumb.at(-1);
            if (!previous) {
              nav("/");
              return;
            }

            nav(previous);

            setBreadCrumb((prev) => prev.slice(0, -1));
          }}
        />
        <span className="font-bold">Post</span>
      </header>
    );
  } else if (selected?.selected === "user") {
    return (
      <header className="flex p-4 border-b w-full">
        <ArrowLeft
          className="mr-8 hover:cursor-pointer"
          onClick={() => {
            const previous = breadCrumb.at(-1);
            if (!previous) {
              nav("/");
              return;
            }

            nav(previous);

            setBreadCrumb((prev) => prev.slice(0, -1));
          }}
        />
        <span className="font-bold">{selected.name}</span>
      </header>
    );
  } else {
    return (
      <header className="sticky bg-background z-999 top-0 border-b-2 flex justify-between items-center p-1 pl-5 pr-5">
        <Link to={isSigned ? `/${username}` : "/signin"}>
          <XeniaAvatar
            className={selected === "profile" ? "ring-2" : ""}
            size="lg"
            imageSrc={isSigned ? imageSrc : guest}
            name={isSigned ? name : "G"}
          />
        </Link>
        <XeniaLogoNoName width={56} height={56} />
        <NotificationBell unreadNotifications={notifications} />
      </header>
    );
  }
}
