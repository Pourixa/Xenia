import { SelectedContext } from "@/routes/Home";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { XeniaAvatar } from "../customUI/XeniaAvatar";
import { XeniaLogoNoName } from "../customUI/XeniaLogoNoName";
import { NotificationBell } from "../customUI/NotificationBell";
import { XeniaHomeIcon } from "../customUI/XeniaHomeIcons";
import { PlusIcon, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "../customUI/XeniaDarkLight";
import { toast } from "../ui/toast";
import { postRequest } from "@/lib/requests";
const guest = "guest.png";
  const handleLogout = async () => {
    try {
      const response = await postRequest("/user/logout", {});
      if (!response.ok) {
        throw new Error(`Logout failed !`);
      }
      window.location.reload();
    } catch (e) {
      toast.add({
        title: "Logout request failed - " + e,
        type: "error",
      });
    }
  };
export function HeaderFooter({
  isSigned,
  username,
  notifications,
  imageSrc,
  name,
}) {
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
  if ((loc.pathname === "/signin") | (loc.pathname === "/signup")) {
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
        <nav className="border-r-2 gap-5 sticky bg-background z-999 top-0 flex flex-col justify-between items-center p-1 pb-5 pt-5">
          <XeniaLogoNoName width={56} height={56} />
          {(loc.pathname === "/signin") | (loc.pathname === "/signup") ? (
            <></>
          ) : (
            <div className="gap-5 bg-background flex flex-col justify-between items-center p-1 pl-5 pr-5">
              <XeniaHomeIcon
                className="hover:cursor-pointer w-8 h-8"
                onClick={() => {
                  nav("/");
                }}
              />
              <PlusIcon
                onClick={() => {
                  nav("/create");
                }}
                className={
                  "hover:cursor-pointer w-8 h-8 " +
                  (selected === "create" ? "ring-2 rounded-full" : "")
                }
              />
              <SearchIcon
                onClick={() => {
                  nav("/search");
                }}
                className={
                  "hover:cursor-pointer w-8 h-8 " +
                  (selected === "search" ? "fill-foreground" : "")
                }
              />
            </div>
          )}
          <div className="gap-5 flex flex-col items-center">
            <ModeToggle InHeaderFooter={true} />
            <NotificationBell
              unreadNotifications={notifications}
              InHeaderFooter={true}
            />
            {isSigned ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <XeniaAvatar
                    className={selected === "profile" ? "ring-2" : ""}
                    size="lg"
                    imageSrc={isSigned ? imageSrc : guest}
                    name={isSigned ? name : "G"}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link to={`/${username}`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    variant={"destructive"}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={"/signin"}>
                <XeniaAvatar
                  className={selected === "profile" ? "ring-2" : ""}
                  size="lg"
                  imageSrc={isSigned ? imageSrc : guest}
                  name={isSigned ? name : "G"}
                />
              </Link>
            )}
          </div>
        </nav>
    );
  }
}
