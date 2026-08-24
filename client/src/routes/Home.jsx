import { Header } from "@/components/Home/Header"
import { Outlet } from "react-router"

export function Home() {
    return <>
    <Header/>
    <Outlet />
    </>
}