import { Footer } from "@/components/Home/Footer";
import { Header } from "@/components/Home/Header";
import { useState, createContext, useContext, useEffect } from "react";
import { Outlet } from "react-router";

export const SelectedContext = createContext(null);

export function HomeTab() {
  const { setSelected } = useContext(SelectedContext);
  useEffect(() => {
    setSelected("home");
  }, [setSelected]);
  return <main className="grow">hi</main>;
}

export function Home() {
  const [selected, setSelected] = useState("home");
  return (
    <div className="flex flex-col h-dvh">
      <SelectedContext value={{ selected, setSelected }}>
        <Header />
        <Outlet />
        <Footer />
      </SelectedContext>
    </div>
  );
}
