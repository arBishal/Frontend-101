"use client";

import { useEffect, useRef, useState } from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/app/lib/cn";

type Tab = {
  label: string;
  code: string;
  lang: string;
};

type SingleProps = {
  code: string;
  lang: string;
  title?: string;
  className?: string;
  tabs?: never;
  onTabChange?: never;
};

type TabbedProps = {
  tabs: Tab[];
  className?: string;
  code?: never;
  lang?: never;
  title?: never;
  onTabChange?: (index: number) => void;
};

type CodeBlockProps = SingleProps | TabbedProps;

export default function CodeBlock(props: CodeBlockProps) {
  const isTabbedMode = !!props.tabs;
  const [activeTab, setActiveTab] = useState(0);
  const [rendered, setRendered] = useState<{ key: string; html: string } | null>(null);
  const cache = useRef(new Map<string, string>());

  const code = isTabbedMode ? props.tabs[activeTab].code : props.code;
  const lang = isTabbedMode ? props.tabs[activeTab].lang : props.lang;
  const codeKey = `${lang}:${code}`;
  const activeHtml = rendered?.key === codeKey ? rendered.html : null;

  useEffect(() => {
    const key = `${lang}:${code}`;
    const cached = cache.current.get(key);
    if (cached) {
      setRendered({ key, html: cached });
      return;
    }
    codeToHtml(code, { lang, themes: { light: "github-light", dark: "github-dark" } })
      .then((html) => {
        cache.current.set(key, html);
        setRendered({ key, html });
      })
      .catch((err) => {
        console.error("Shiki highlighting failed:", err);
      });
  }, [code, lang]);

  function handleTabChange(index: number) {
    setActiveTab(index);
    props.onTabChange?.(index);
  }

  const lineCount = code.split("\n").length;

  return (
    <div className={cn("rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden", props.className)}>
      {/* Header — tabs or title */}
      {isTabbedMode ? (
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800">
          {props.tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => handleTabChange(i)}
              className={cn(
                "flex-1 px-4 py-2 font-mono text-xs sm:text-sm transition-colors",
                activeTab === i
                  ? "text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : props.title ? (
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800">
          <div className="flex-1 px-4 py-2 font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
            {props.title}
          </div>
        </div>
      ) : null}

      {/* Code area */}
      <div className="flex overflow-x-auto">
        {/* Line numbers */}
        <div
          className="shrink-0 py-4 pl-4 pr-3 text-right font-mono text-xs leading-relaxed text-zinc-400 dark:text-zinc-600 select-none"
          aria-hidden
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        {/* Code */}
        {activeHtml ? (
          <div
            className="flex-1 py-4 pr-4 font-mono text-xs leading-relaxed overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: activeHtml }}
          />
        ) : (
          <div className="flex-1 py-4 pr-4 font-mono text-xs leading-relaxed overflow-x-auto">
            <pre className="text-zinc-700 dark:text-zinc-400 whitespace-pre">{code}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
