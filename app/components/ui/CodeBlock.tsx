"use client";

import { useEffect, useRef, useState } from "react";
import { getHighlighter } from "@/app/lib/highlighter";
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
  const [rendered, setRendered] = useState<{
    key: string;
    html: string;
  } | null>(null);
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
    let cancelled = false;
    getHighlighter()
      .then((highlighter) => {
        if (cancelled) return;
        const html = highlighter.codeToHtml(code, {
          lang,
          themes: { light: "github-light", dark: "github-dark" },
        });
        cache.current.set(key, html);
        setRendered({ key, html });
      })
      .catch((err) => {
        console.error("Shiki highlighting failed:", err);
      });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  function handleTabChange(index: number) {
    setActiveTab(index);
    props.onTabChange?.(index);
  }

  const lineCount = code.split("\n").length;

  return (
    <div
      className={cn(
        "bg-raised border-default overflow-hidden rounded-lg border",
        props.className,
      )}
    >
      {/* Header — tabs or title */}
      {isTabbedMode ? (
        <div className="border-default bg-header flex border-b">
          {props.tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => handleTabChange(i)}
              className={cn(
                "flex-1 px-4 py-2 font-mono text-xs transition-colors sm:text-sm",
                activeTab === i
                  ? "text-strong bg-header"
                  : "text-subtle bg-raised hover:text-zinc-800 dark:hover:text-zinc-200",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : props.title ? (
        <div className="border-default bg-header flex border-b">
          <div className="text-strong flex-1 px-4 py-2 font-mono text-xs sm:text-sm">
            {props.title}
          </div>
        </div>
      ) : null}

      {/* Code area */}
      <div className="flex overflow-x-auto">
        {/* Line numbers */}
        <div
          className="shrink-0 py-4 pr-3 pl-4 text-right font-mono text-xs leading-relaxed text-zinc-500 select-none dark:text-zinc-400"
          aria-hidden
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        {/* Code */}
        {activeHtml ? (
          <div
            className="flex-1 overflow-x-auto py-4 pr-4 font-mono text-xs leading-relaxed [&_code]:!bg-transparent [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: activeHtml }}
          />
        ) : (
          <div className="flex-1 overflow-x-auto py-4 pr-4 font-mono text-xs leading-relaxed">
            <pre className="whitespace-pre text-zinc-700 dark:text-zinc-400">
              {code}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
