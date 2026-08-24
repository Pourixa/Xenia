import { useContext, useEffect } from "react";
import { SelectedContext } from "./Home";

export function Profile() {
  const { setSelected } = useContext(SelectedContext);
  useEffect(() => {
    setSelected("profile");
  }, [setSelected]);
  return <></>;
}
