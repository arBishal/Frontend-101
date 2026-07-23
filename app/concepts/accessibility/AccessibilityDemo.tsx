"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/app/components/ui/Input";
import Card from "@/app/components/ui/Card";
import InspectorPanel from "@/app/components/ui/InspectorPanel";
import { cn } from "@/app/lib/cn";

type Fix = "altText" | "contrast" | "labels" | "keyboard";

const fixLabels: Record<Fix, string> = {
  altText: "alt text",
  contrast: "contrast",
  labels: "form labels",
  keyboard: "keyboard",
};

const fixKeys: Fix[] = ["altText", "contrast", "labels", "keyboard"];

export default function AccessibilityDemo() {
  const [fixes, setFixes] = useState<Record<Fix, boolean>>({
    altText: false,
    contrast: false,
    labels: false,
    keyboard: false,
  });

  function toggle(fix: Fix) {
    setFixes((prev) => ({ ...prev, [fix]: !prev[fix] }));
  }

  const score = fixKeys.filter((k) => fixes[k]).length;

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Login Form */}
      <Card className="w-full space-y-5">
        {/* Logo */}
        <div className="relative w-fit">
          <Image
            src="https://cdn.simpleicons.org/wikipedia"
            width={40}
            height={40}
            alt={fixes.altText ? "Wikipedia logo" : ""}
            className="size-10 rounded-lg dark:invert"
            unoptimized
          />
          {fixes.altText && (
            <span className="absolute top-0 left-12 font-mono text-xxs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded whitespace-nowrap">
              alt: Wikipedia logo
            </span>
          )}
        </div>

        {/* Heading */}
        <h2
          className={cn(
            "text-lg md:text-xl font-semibold transition-colors duration-200",
            fixes.contrast ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-300 dark:text-zinc-600"
          )}
        >
          Log in to your account
        </h2>

        {/* Form fields */}
        <div className="space-y-3">
          {[
            { id: "demo-email", label: "Email address", placeholder: "Email address", type: "email" },
            { id: "demo-password", label: "Password", placeholder: "Password", type: "password" },
          ].map((field) => (
            <div key={field.id}>
              {fixes.labels && (
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                >
                  {field.label}
                </label>
              )}
              <Input
                id={field.id}
                type={field.type}
                placeholder={fixes.labels ? field.placeholder : "Required"}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Log In button */}
        <div className="flex justify-end">
          {fixes.keyboard ? (
            <button className="w-full sm:w-auto bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md px-6 py-2 text-sm font-medium text-center transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-300 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 outline-none">
              Log In
            </button>
          ) : (
            <div className="w-full sm:w-auto bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md px-6 py-2 text-sm font-medium text-center cursor-pointer select-none">
              Log In
            </div>
          )}
        </div>
      </Card>

      {/* Accessibility Audit */}
      <InspectorPanel title="Accessibility Audit">
        <div className="space-y-2 text-xs">
          {fixKeys.map((key) => (
            <div key={key} className="flex justify-between items-center gap-3">
              <span className="text-zinc-600 dark:text-zinc-400">{fixLabels[key]}</span>
              <button
                type="button"
                aria-pressed={fixes[key]}
                onClick={() => toggle(key)}
                className={cn(
                  "font-mono font-medium transition-colors cursor-pointer",
                  fixes[key] ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                )}
              >
                {fixes[key] ? "ON" : "OFF"}
              </button>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-700 mt-4 pt-3 flex justify-between items-center text-xs">
          <span className="text-zinc-600 dark:text-zinc-400">score</span>
          <span
            className={cn(
              "font-medium",
              score === 0 ? "text-red-400" : score <= 2 ? "text-amber-400" : "text-emerald-400"
            )}
          >
            {score} / {fixKeys.length}
            {score === fixKeys.length && ", Perfect!"}
          </span>
        </div>
      </InspectorPanel>
    </div>
  );
}
