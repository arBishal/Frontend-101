"use client";

import { useState } from "react";
import { Rocket } from "lucide-react";
import Card from "@/app/components/ui/Card";
import InspectorPanel from "@/app/components/ui/InspectorPanel";
import CodeBlock from "@/app/components/ui/CodeBlock";
import { cn } from "@/app/lib/cn";

const variantStyles = {
  solid:
    "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:enabled:bg-zinc-700 dark:hover:enabled:bg-zinc-300",
  outline:
    "border border-zinc-300 dark:border-zinc-700 text-body hover:enabled:bg-zinc-100 dark:hover:enabled:bg-zinc-800",
  ghost:
    "text-muted hover:enabled:bg-zinc-100 dark:hover:enabled:bg-zinc-800 hover:enabled:text-zinc-900 dark:hover:enabled:text-zinc-100",
} as const;

const radiusCss = {
  rounded: { class: "rounded", value: "0.25rem" },
  pill: { class: "rounded-full", value: "9999px" },
  square: { class: "rounded-none", value: "0" },
} as const;

const sizeCss = {
  sm: {
    class: "px-4 py-2 text-xs",
    padding: "0.5rem 1rem",
    fontSize: "0.75rem",
  },
  md: {
    class: "px-6 py-3 text-sm",
    padding: "0.75rem 1.5rem",
    fontSize: "0.875rem",
  },
  lg: { class: "px-8 py-4 text-base", padding: "1rem 2rem", fontSize: "1rem" },
} as const;

type Variant = keyof typeof variantStyles;
type Radius = keyof typeof radiusCss;
type Size = keyof typeof sizeCss;

function DemoButton({
  variant = "solid",
  disabled,
  radius = "rounded",
  size = "md",
  children,
}: {
  variant?: Variant;
  disabled?: boolean;
  radius?: Radius;
  size?: Size;
  children: React.ReactNode;
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        radiusCss[radius].class,
        sizeCss[size].class,
        variantStyles[variant],
      )}
    >
      {children}
    </button>
  );
}

const variants: Variant[] = ["solid", "outline", "ghost"];

function OptionToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "cursor-pointer rounded px-2 py-1 font-mono text-xs transition-colors",
            value === opt
              ? "bg-zinc-200 text-emerald-800 dark:bg-zinc-700 dark:text-emerald-400"
              : "text-muted hover:text-zinc-900 dark:hover:text-zinc-200",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function buildJsxSnippet(disabledMap: Record<Variant, boolean>) {
  return variants
    .map((v) => {
      const disabledAttr = disabledMap[v] ? " disabled" : "";
      return `<Button variant="${v}"${disabledAttr}>\n  <Rocket /> Submit\n</Button>`;
    })
    .join("\n");
}

function buildCssSnippet(radius: Radius, size: Size) {
  return `.button {
  border-radius: ${radiusCss[radius].value};
  padding: ${sizeCss[size].padding};
  font-size: ${sizeCss[size].fontSize};
}`;
}

export default function ComponentDemo() {
  const [disabledMap, setDisabledMap] = useState<Record<Variant, boolean>>({
    solid: false,
    outline: false,
    ghost: false,
  });
  const [radius, setRadius] = useState<Radius>("rounded");
  const [size, setSize] = useState<Size>("md");

  function toggleDisabled(variant: Variant) {
    setDisabledMap((prev) => ({ ...prev, [variant]: !prev[variant] }));
  }

  return (
    <div className="space-y-4">
      {/* Live Preview — full width */}
      <Card className="flex flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-around xl:gap-6">
        {variants.map((variant) => (
          <div
            key={variant}
            className="flex items-center gap-3 xl:flex-col xl:gap-4"
          >
            <span className="text-subtle w-16 shrink-0 font-mono text-xs xl:w-auto">
              {variant}
            </span>
            <DemoButton
              variant={variant}
              disabled={disabledMap[variant]}
              radius={radius}
              size={size}
            >
              <Rocket className="size-4" />
              Submit
            </DemoButton>
          </div>
        ))}
      </Card>

      {/* Panels — side by side at sm+ */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Props Inspector */}
        <InspectorPanel title="Props Inspector" className="flex-1">
          <div className="space-y-2.5 text-xs">
            {variants.map((variant, i) => (
              <div
                key={variant}
                className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-muted w-4 shrink-0">#{i + 1}</span>
                  <span className="text-muted">variant</span>
                  <span className="text-emerald-700 dark:text-emerald-400">
                    &quot;{variant}&quot;
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-6 sm:ml-auto sm:pl-0">
                  <span className="text-muted">disabled</span>
                  <button
                    onClick={() => toggleDisabled(variant)}
                    className={cn(
                      "cursor-pointer font-mono transition-colors",
                      disabledMap[variant]
                        ? "text-amber-700 dark:text-amber-400"
                        : "text-amber-600/60 dark:text-amber-400/70",
                    )}
                  >
                    {String(disabledMap[variant])}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InspectorPanel>

        {/* Style Editor */}
        <InspectorPanel title="Style Editor" className="flex-1">
          <div className="space-y-3 text-xs">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-6">
              <p className="text-muted w-24 shrink-0 uppercase">
                border-radius
              </p>
              <OptionToggle
                options={["rounded", "pill", "square"] as const}
                value={radius}
                onChange={setRadius}
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-6">
              <p className="text-muted w-24 shrink-0 uppercase">size</p>
              <OptionToggle
                options={["sm", "md", "lg"] as const}
                value={size}
                onChange={setSize}
              />
            </div>
          </div>
        </InspectorPanel>
      </div>

      {/* Code View */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <CodeBlock
          code={buildJsxSnippet(disabledMap)}
          lang="tsx"
          title="JSX"
          className="flex-1"
        />
        <CodeBlock
          code={buildCssSnippet(radius, size)}
          lang="css"
          title="CSS"
          className="flex-1"
        />
      </div>
    </div>
  );
}
