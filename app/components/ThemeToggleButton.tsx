"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";
import { cn } from "@/app/lib/cn";

type ThemeToggleButtonProps = {
  className?: string;
  tabIndex?: number;
  "aria-hidden"?: boolean;
};

export default function ThemeToggleButton({
  className,
  ...rest
}: ThemeToggleButtonProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn("cursor-pointer transition-colors", className)}
      aria-label="Toggle theme"
      {...rest}
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="block size-4 dark:hidden" />
    </button>
  );
}
