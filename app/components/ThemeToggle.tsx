"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="fixed bottom-4 right-4 z-50 rounded-full p-2.5 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <Sun className="size-4 hidden dark:block" />
      <Moon className="size-4 block dark:hidden" />
    </button>
  );
}
