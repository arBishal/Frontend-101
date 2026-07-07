"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import Button from "@/app/components/ui/Button";

function XRaySection({
  label,
  active,
  children,
  className,
}: {
  label: string;
  active: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative border transition-colors duration-200 rounded-lg ${
        active
          ? "border-dashed border-zinc-400 dark:border-zinc-500"
          : "border-transparent"
      } ${className ?? ""}`}
    >
      <span
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 font-mono text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 whitespace-nowrap transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

export default function ComponentDemo() {
  const [xray, setXray] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 hidden sm:block">
          Toggle X-ray mode to reveal the component boundaries.
        </p>
        <Button
          variant="outline"
          onClick={() => setXray(!xray)}
          className="w-full sm:w-auto font-mono px-4 py-2 justify-center"
        >
          {xray ? (
            <>
              <X className="size-4" />
              Hide Components
            </>
          ) : (
            <>
              <Search className="size-4" />
              Show Components
            </>
          )}
        </Button>
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 space-y-3 sm:space-y-4">
        {/* Navbar — full width */}
        <XRaySection label="navbar" active={xray}>
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-4 py-3 flex items-center justify-between gap-3">
            <div className="size-6 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0" />
            <div className="hidden sm:flex gap-3">
              <div className="h-2.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="h-2.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="size-5 rounded bg-zinc-300 dark:bg-zinc-600 shrink-0" />
          </div>
        </XRaySection>

        {/* Sidebar + Main */}
        <div className="flex">
          {/* Sidebar */}
          <XRaySection label="sidebar" active={xray} className="hidden sm:block self-stretch mr-3 sm:mr-4">
            <div className="flex flex-col gap-3.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-5 h-full">
              <div className="flex items-center gap-2.5">
                <div className="size-5 shrink-0 rounded bg-zinc-300 dark:bg-zinc-600" />
                <div className="h-2 w-14 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="size-5 shrink-0 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-2 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="size-5 shrink-0 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-2 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="size-5 shrink-0 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-2 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="size-5 shrink-0 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-2 w-14 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          </XRaySection>

          {/* Main content */}
          <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {["stat card", "stat card", "stat card", "stat card"].map((label, i) => (
                <XRaySection key={i} label={label} active={xray}>
                  <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-3 sm:p-4 space-y-2">
                    <div className="h-2 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    <div className="h-4 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  </div>
                </XRaySection>
              ))}
            </div>

            {/* Table */}
            <XRaySection label="table" active={xray}>
              <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                {/* Table header */}
                <div className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 grid grid-cols-4 gap-3">
                  <div className="h-2 w-16 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <div className="h-2 w-14 rounded-full bg-zinc-300 dark:bg-zinc-600 hidden sm:block" />
                  <div className="h-2 w-12 rounded-full bg-zinc-300 dark:bg-zinc-600 hidden sm:block" />
                  <div className="h-2 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600 ml-auto" />
                </div>
                {/* Table rows */}
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="px-4 py-2.5 grid grid-cols-4 gap-3 border-t border-zinc-200 dark:border-zinc-700"
                  >
                    <div className="h-2 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    <div className="h-2 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700 hidden sm:block" />
                    <div className="h-2 w-14 rounded-full bg-zinc-200 dark:bg-zinc-700 hidden sm:block" />
                    <div className="h-2 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 ml-auto" />
                  </div>
                ))}
              </div>
            </XRaySection>
          </div>
        </div>

        {/* Footer — full width */}
        <XRaySection label="footer" active={xray}>
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-4 py-3 flex items-center justify-between">
            <div className="h-2.5 w-20 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-2 w-28 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </XRaySection>
      </div>
    </div>
  );
}
