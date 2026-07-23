"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "@/app/components/ThemeToggleButton";
import { cn } from "@/app/lib/cn";

export default function ThemeToggle() {
  const pathname = usePathname();
  const [atNav, setAtNav] = useState(false);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (!nav) return;
    const observer = new IntersectionObserver(([entry]) =>
      setAtNav(entry.isIntersecting)
    );
    observer.observe(nav);
    return () => {
      observer.disconnect();
      setAtNav(false);
    };
  }, [pathname]);

  return (
    <ThemeToggleButton
      className={cn(
        "fixed top-4 right-4 z-50 rounded-full p-2.5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 transition duration-300",
        atNav && "opacity-0 pointer-events-none"
      )}
      aria-hidden={atNav}
      tabIndex={atNav ? -1 : undefined}
    />
  );
}
