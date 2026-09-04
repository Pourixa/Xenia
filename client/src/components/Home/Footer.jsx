import { SelectedContext } from "@/routes/Home";
import { PlusIcon, Search } from "lucide-react";
import { useContext } from "react";
import { XeniaHomeIcon } from "../customUI/XeniaHomeIcons";
import { useLocation, useNavigate } from "react-router";

export function Footer() {
  const { selected } = useContext(SelectedContext);
  const nav = useNavigate();
  const loc = useLocation();
  if ((loc.pathname === "/signin") | (loc.pathname === "/signup")) return;
  return (
    <footer className=" bg-background  border-t-2 flex justify-between items-center p-1 pl-5 pr-5">
      <XeniaHomeIcon
        className="hover:cursor-pointer"
        onClick={() => {
          nav("/");
        }}
      />
      <PlusIcon
        onClick={() => {
          nav("/create");
        }}
        className={
          "hover:cursor-pointer " +
          (selected === "create" ? "ring-2 rounded-full" : "")
        }
      />
      <Search
        onClick={() => {
          nav("/search");
        }}
        className={
          "hover:cursor-pointer " +
          (selected === "search" ? "fill-foreground" : "")
        }
      />
    </footer>
  );
}
