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
      setAtNav(entry.isIntersecting),
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
        "fixed top-4 right-3 z-50 rounded-full bg-zinc-100/80 p-2.5 text-zinc-500 backdrop-blur-sm transition duration-300 hover:text-zinc-700 lg:right-5 dark:bg-zinc-900/80 dark:text-zinc-500 dark:hover:text-zinc-300",
        atNav && "pointer-events-none opacity-0",
      )}
      aria-hidden={atNav}
      tabIndex={atNav ? -1 : undefined}
    />
  );
}
