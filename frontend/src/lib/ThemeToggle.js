import { useEffect, useState } from "react";
import { LuMoon } from "react-icons/lu";
import { IoIosSunny } from "react-icons/io";

const ThemeToggle = ({ className = "text-3xl" }) => {
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
    <button onClick={toggleTheme} aria-label="Toggle theme" type="button">
      {theme === "light" ? (
        <LuMoon className={className} />
      ) : (
        <IoIosSunny className={`${className} text-orange-500`} />
      )}
    </button>
  );
};

export default ThemeToggle;
