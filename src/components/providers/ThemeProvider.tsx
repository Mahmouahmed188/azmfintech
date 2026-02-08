"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "azm-fintech-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);

  // Resolve the actual theme to apply
  const resolveTheme = useCallback((currentTheme: Theme): "light" | "dark" => {
    if (currentTheme === "system") {
      return getSystemTheme();
    }
    return currentTheme;
  }, [getSystemTheme]);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: "light" | "dark") => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const body = document.body;

    // Disable transitions temporarily if requested
    if (disableTransitionOnChange) {
      body.classList.add("no-theme-transition");
    }

    // Remove existing theme attribute
    root.removeAttribute("data-theme");
    
    // Force a reflow
    void root.offsetHeight;
    
    // Apply new theme
    root.setAttribute("data-theme", newTheme);

    // Re-enable transitions
    if (disableTransitionOnChange) {
      requestAnimationFrame(() => {
        body.classList.remove("no-theme-transition");
      });
    }

    setResolvedTheme(newTheme);
  }, [disableTransitionOnChange]);

  // Set theme with persistence
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }

    const resolved = resolveTheme(newTheme);
    applyTheme(resolved);
  }, [resolveTheme, applyTheme]);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const currentResolved = resolveTheme(theme);
    const newTheme = currentResolved === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [theme, resolveTheme, setTheme]);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") return;

    // Get saved theme or use default
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initialTheme = savedTheme || defaultTheme;
    
    setThemeState(initialTheme);
    
    const resolved = resolveTheme(initialTheme);
    applyTheme(resolved);

    // Listen for system theme changes
    if (enableSystem) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = () => {
        if (theme === "system") {
          const newResolved = getSystemTheme();
          applyTheme(newResolved);
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [defaultTheme, enableSystem, theme, resolveTheme, applyTheme, getSystemTheme]);

  // Apply theme to document after mount (separate from provider render to avoid SSR issues)
  useEffect(() => {
    if (!mounted) return;
    
    const resolved = resolveTheme(theme);
    applyTheme(resolved);
  }, [mounted, theme, resolveTheme, applyTheme]);

  // Always render the provider to avoid context errors, but defer theme application until mounted
  return (
    <ThemeContext.Provider
      value={{
        theme: mounted ? theme : defaultTheme,
        resolvedTheme: mounted ? resolvedTheme : "light",
        setTheme: mounted ? setTheme : () => {},
        toggleTheme: mounted ? toggleTheme : () => {},
        isDark: mounted ? resolvedTheme === "dark" : false,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Hook for components that need to know theme but can't use context
export function useThemeValue() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  useEffect(() => {
    if (typeof document === "undefined") return;
    
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
      if (currentTheme) {
        setTheme(currentTheme);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Initial value
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
    if (currentTheme) {
      setTheme(currentTheme);
    }

    return () => observer.disconnect();
  }, []);

  return theme;
}
