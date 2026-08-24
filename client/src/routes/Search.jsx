import { useContext, useEffect } from "react";
import { SelectedContext } from "./Home";

export function Search() {
  const { setSelected } = useContext(SelectedContext);
  useEffect(() => {
    setSelected("search");
  }, [setSelected]);
  return;
}
