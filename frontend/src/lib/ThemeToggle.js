import { useEffect, useState } from "react";
import { LuMoon } from "react-icons/lu";
import { IoIosSunny } from "react-icons/io";

const ThemeToggle = () => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "light" ? (
        <LuMoon className="text-3xl" />
      ) : (
        <IoIosSunny className="text-3xl text-orange-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
