"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "switch" | "button";
}

export function ThemeToggle({
  className,
  size = "md",
  variant = "icon",
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: {
      icon: "w-8 h-8",
      switch: "w-12 h-6",
      button: "px-3 py-1.5 text-xs",
      iconSize: 14,
    },
    md: {
      icon: "w-10 h-10",
      switch: "w-14 h-7",
      button: "px-4 py-2 text-sm",
      iconSize: 18,
    },
    lg: {
      icon: "w-12 h-12",
      switch: "w-16 h-8",
      button: "px-5 py-2.5 text-base",
      iconSize: 22,
    },
  };

  const sizes = sizeClasses[size];

  if (variant === "switch") {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "relative rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
          sizes.switch,
          isDark ? "bg-[var(--primary)]" : "bg-[var(--border-dark)]",
          className
        )}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <motion.div
          className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
          animate={{
            x: isDark ? (size === "sm" ? 20 : size === "md" ? 24 : 28) : 0,
            rotate: isDark ? 360 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                <Moon size={12} className="text-[var(--primary)]" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                <Sun size={12} className="text-amber-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Icons in the background */}
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] opacity-50">
          <Sun size={12} className="text-white" />
        </span>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] opacity-50">
          <Moon size={12} className="text-white" />
        </span>
      </button>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300",
          "border border-[var(--border)] hover:border-[var(--primary)]",
          "bg-[var(--surface)] hover:bg-[var(--surface-hover)]",
          "text-[var(--text-primary)]",
          sizes.button,
          className
        )}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon-button"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Moon size={sizes.iconSize} className="text-[var(--primary)]" />
              <span className="hidden sm:inline">Dark</span>
            </motion.div>
          ) : (
            <motion.div
              key="sun-button"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Sun size={sizes.iconSize} className="text-amber-500" />
              <span className="hidden sm:inline">Light</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    );
  }

  // Default icon variant
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center rounded-xl transition-all duration-300",
        "bg-[var(--surface)] hover:bg-[var(--surface-hover)]",
        "border border-[var(--border)] hover:border-[var(--primary)]",
        "text-[var(--text-primary)] hover:text-[var(--primary)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        sizes.icon,
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon-icon"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <Moon size={sizes.iconSize} className="text-[var(--primary)]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun-icon"
            initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <Sun size={sizes.iconSize} className="text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-[var(--primary)] opacity-0 blur-xl"
        animate={{
          opacity: isDark ? [0, 0.3, 0] : 0,
        }}
        transition={{
          duration: 1,
          repeat: isDark ? Infinity : 0,
          repeatDelay: 2,
        }}
      />
    </button>
  );
}

export default ThemeToggle;
