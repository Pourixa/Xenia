import { useContext, useEffect } from "react";
import { SelectedContext } from "./Home";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Search() {
  const { setSelected } = useContext(SelectedContext);
  useEffect(() => {
    setSelected("search");
  }, [setSelected]);
  return <main className="grow">
    <div className="flex p-4 border-b">
        <Input id="input-button-group" placeholder="Type to search..." />
        <Button >Search</Button>
    </div>
  </main>
}
