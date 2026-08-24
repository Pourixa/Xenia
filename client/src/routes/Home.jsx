import { Footer } from "@/components/Home/Footer"
import { Header } from "@/components/Home/Header"
import { Outlet } from "react-router"

export function HomeTab() {
    return <main className="grow">
        hi
    </main>
}

export function Home() {
    return <div className="flex flex-col h-dvh">
    <Header/>
    <Outlet />
    <Footer/>
    </div>
}