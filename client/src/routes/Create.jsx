import { useContext, useEffect } from "react";
import { SelectedContext } from "./Home";

export function Create() {
  const { setSelected } = useContext(SelectedContext);
  useEffect(() => {
    setSelected("create");
  }, [setSelected]);
  return;
}
