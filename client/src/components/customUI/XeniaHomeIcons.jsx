import { SelectedContext } from "@/routes/Home";
import { useContext } from "react";

export function XeniaHomeIcon({ className = "", ...props }) {
  const { selected, setSelected } = useContext(SelectedContext);
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* House */}
      <path
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
        fill={selected === "home" ? "var(--foreground)" : "var(--background)"}
        stroke="var(--foreground)"
        strokeWidth={2}
      />

      {/* Door cutout */}
      <path
        d="M9 21V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V21H9Z"
        fill={selected === "home" ? "var(--background)" : "var(--foreground)"}
      />
    </svg>
  );
}