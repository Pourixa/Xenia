import { Moon, Sun } from "lucide-react";

import { useTheme } from "../ui/theme-provider";

export function ModeToggle({InHeaderFooter = false}) {
  const { theme, setTheme } = useTheme();
  if (InHeaderFooter) {
    if (theme == "dark") return <Moon onClick={() => setTheme("light")} />;
    else return <Sun onClick={() => setTheme("dark")} />;
  } else {
        if (theme == "dark") return <span onClick={() => setTheme("light")}>Light mode</span>
    else return <span onClick={() => setTheme("dark")}>Dark mode</span>;
  }
}
