"use client";

/**
 * Theme context for managing light/dark mode across the application
 */

import React, { useContext, useEffect, useState } from "react";
import type { ThemeContextType, ThemeType } from "@/lib/types";

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";

      // Update localStorage
      try {
        window.localStorage.setItem("theme", newTheme);
      } catch (error) {
        console.error("Failed to save theme preference:", error);
      }

      // Update DOM
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newTheme;
    });
  };

  useEffect(() => {
    try {
      // Check localStorage first
      const savedTheme = localStorage.getItem("theme") as ThemeType | null;

      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // Fallback to system preference
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }
    } catch (error) {
      console.error("Failed to load theme preference:", error);
    }
  }, []);

  // Note: the provider must always wrap children — returning them bare on the
  // server (pre-mount) crashes prerendering for every consumer of the context.
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 * @returns Theme context with current theme and toggle function
 * @throws Error if used outside ThemeContextProvider
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useThemeContext must be used within ThemeContextProvider");
  }

  return context;
};

export default ThemeContextProvider;
