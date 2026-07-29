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
    <div className="flex flex-col gap-4 sm:flex-row">
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
            <span className="text-xxs absolute top-0 left-12 rounded bg-emerald-100 px-1.5 py-0.5 font-mono whitespace-nowrap text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
              alt: Wikipedia logo
            </span>
          )}
        </div>

        {/* Heading */}
        <h2
          className={cn(
            "text-lg font-semibold transition-colors duration-200 md:text-xl",
            fixes.contrast ? "text-strong" : "text-zinc-300 dark:text-zinc-600",
          )}
        >
          Log in to your account
        </h2>

        {/* Form fields */}
        <div className="space-y-3">
          {[
            {
              id: "demo-email",
              label: "Email address",
              placeholder: "Email address",
              type: "email",
            },
            {
              id: "demo-password",
              label: "Password",
              placeholder: "Password",
              type: "password",
            },
          ].map((field) => (
            <div key={field.id}>
              {fixes.labels && (
                <label
                  htmlFor={field.id}
                  className="text-body mb-1 block text-sm font-medium"
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
            <button className="w-full rounded-md bg-zinc-900 px-6 py-2 text-center text-sm font-medium text-white transition-colors outline-none hover:bg-zinc-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white sm:w-auto dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus:ring-offset-zinc-900">
              Log In
            </button>
          ) : (
            <div className="w-full cursor-pointer rounded-md bg-zinc-900 px-6 py-2 text-center text-sm font-medium text-white select-none sm:w-auto dark:bg-zinc-100 dark:text-zinc-900">
              Log In
            </div>
          )}
        </div>
      </Card>

      {/* Accessibility Audit */}
      <InspectorPanel title="Accessibility Audit">
        <div className="space-y-2 text-xs">
          {fixKeys.map((key) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <span className="text-muted">{fixLabels[key]}</span>
              <button
                type="button"
                aria-pressed={fixes[key]}
                onClick={() => toggle(key)}
                className={cn(
                  "cursor-pointer font-mono font-medium transition-colors",
                  fixes[key]
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400",
                )}
              >
                {fixes[key] ? "ON" : "OFF"}
              </button>
            </div>
          ))}
        </div>
        <div className="border-default mt-4 flex items-center justify-between border-t pt-3 text-xs">
          <span className="text-muted">score</span>
          <span
            className={cn(
              "font-medium",
              score === 0
                ? "text-red-600 dark:text-red-400"
                : score <= 2
                  ? "text-amber-700 dark:text-amber-400"
                  : "text-emerald-700 dark:text-emerald-400",
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
