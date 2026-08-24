import { HomeIcon, PlusIcon, Search } from "lucide-react";

export function Footer({selected}) {
    return <footer className="border-t-2 flex justify-between items-center p-1 pl-5 pr-5">
        <HomeIcon/>
        <PlusIcon/>
        <Search/>
    </footer>
}