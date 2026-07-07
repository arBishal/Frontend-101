"use client";

import { useState } from "react";
import Input from "@/app/components/ui/Input";

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
      {/* Signup Form */}
      <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 space-y-5">
        {/* Logo */}
        <div className="relative w-fit">
          <img
            src="https://cdn.simpleicons.org/wikipedia"
            width={40}
            height={40}
            className="size-10 rounded-lg dark:invert"
            {...(fixes.altText
              ? { alt: "Wikipedia logo" }
              : { alt: "" })}
          />
          {fixes.altText && (
            <span className="absolute top-0 left-12 font-mono text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded whitespace-nowrap">
              alt: Wikipedia logo
            </span>
          )}
        </div>

        {/* Heading */}
        <h2
          className={`text-lg md:text-xl font-semibold transition-colors duration-200 ${
            fixes.contrast
              ? "text-zinc-900 dark:text-zinc-50"
              : "text-zinc-300 dark:text-zinc-600"
          }`}
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
      </div>

      {/* Accessibility Audit */}
      <div className="w-full sm:w-1/3 shrink-0 rounded-lg bg-zinc-900 dark:bg-zinc-800 p-4 font-mono text-sm">
        <p className="text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-3">
          Accessibility Audit
        </p>
        <div className="space-y-2 text-xs">
          {fixKeys.map((key) => (
            <div key={key} className="flex justify-between items-center gap-3">
              <span className="text-zinc-400">{fixLabels[key]}</span>
              <button
                onClick={() => toggle(key)}
                className={`font-mono font-medium transition-colors cursor-pointer ${
                  fixes[key] ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {fixes[key] ? "ON" : "OFF"}
              </button>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-700 mt-4 pt-3 flex justify-between items-center text-xs">
          <span className="text-zinc-400">score</span>
          <span
            className={`font-medium ${
              score === 0
                ? "text-red-400"
                : score <= 2
                  ? "text-amber-400"
                  : "text-emerald-400"
            }`}
          >
            {score} / {fixKeys.length}
            {score === fixKeys.length && " — Perfect!"}
          </span>
        </div>
      </div>
    </div>
  );
}
