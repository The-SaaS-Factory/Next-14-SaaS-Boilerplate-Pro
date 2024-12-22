"use client";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const useDarkTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleDarkTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkTheme(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkTheme(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkTheme(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkTheme(false);
    }
  }, []);

  return {
    darkThemeSelector: (
      <div>
        {" "}
        <Button variant="outline" size="icon" onClick={handleDarkTheme}>
          {!isDarkTheme ? (
            <MoonIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <SunIcon className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    ),
    isDarkTheme: isDarkTheme,
  };
};

export default useDarkTheme;
