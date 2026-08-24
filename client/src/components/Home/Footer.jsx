import { SelectedContext } from "@/routes/Home";
import { HomeIcon, PlusIcon, Search } from "lucide-react";
import { useContext } from "react";
import { XeniaHomeIcon } from "../customUI/XeniaHomeIcons";

export function Footer() {
  const { selected, setSelected } = useContext(SelectedContext);
  return (
    <footer className="border-t-2 flex justify-between items-center p-1 pl-5 pr-5">
      <XeniaHomeIcon onClick={() => setSelected("home")}/>
      <PlusIcon onClick={() => setSelected("create")} className={selected === "create" ? "ring-2 rounded-full" : ""}/>
      <Search onClick={() => setSelected("search")} className={selected === "search" ? "fill-foreground" : ""}/>
    </footer>
  );
}
