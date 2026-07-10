import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import {
  siReact,
  siVuedotjs,
  siAngular,
  siSvelte,
  siNextdotjs,
  siNuxt,
} from "simple-icons";

export const metadata: Metadata = {
  title: "The Current Landscape | Frontend 101",
  description: "The major frameworks and what makes each one different.",
};

const frameworks = [
  {
    name: "React",
    icon: siReact,
    philosophy: "The most widely used. Component-based, virtual DOM, massive ecosystem.",
    users: ["Meta", "Netflix", "Airbnb"],
    url: "https://react.dev",
  },
  {
    name: "Next.js",
    icon: siNextdotjs,
    philosophy: "React framework with file-based routing, SSR, and full-stack capabilities.",
    users: ["Vercel", "TikTok", "Notion"],
    url: "https://nextjs.org",
    darkInvert: true,
  },
  {
    name: "Vue",
    icon: siVuedotjs,
    philosophy: "Approachable and flexible. Great docs, gentle learning curve.",
    users: ["Alibaba", "GitLab", "Nintendo"],
    url: "https://vuejs.org",
  },
  {
    name: "Nuxt.js",
    icon: siNuxt,
    philosophy: "Vue framework with SSR, file-based routing, and auto-imports.",
    users: ["Backmarket", "Ecosia"],
    url: "https://nuxt.com",
  },
  {
    name: "Angular",
    icon: siAngular,
    colorOverride: "#DD0031",
    philosophy: "Full-featured, opinionated. Built-in routing, forms, HTTP.",
    users: ["Google", "Microsoft", "IBM"],
    url: "https://angular.dev",
  },
  {
    name: "Svelte",
    icon: siSvelte,
    philosophy: "Compiles away the framework. No virtual DOM, minimal runtime.",
    users: ["The New York Times", "GoDaddy"],
    url: "https://svelte.dev",
  },
];

export default function LandscapePage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          The Current Landscape
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          The major frameworks and what makes each one different.
        </p>
      </div>

      <div>
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300 mb-4">
          Major frameworks
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {frameworks.map(({ name, icon, philosophy, users, url, colorOverride, darkInvert }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 space-y-3 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className={`size-5 shrink-0${darkInvert ? " dark:invert" : ""}`}
                    style={{ fill: colorOverride ?? `#${icon.hex}` }}
                  >
                    <path d={icon.path} />
                  </svg>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {name}
                  </p>
                </div>
                <ExternalLink className="size-3.5 text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {philosophy}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {users.map((user) => (
                  <span
                    key={user}
                    className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400"
                  >
                    {user}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      <p className="text-sm text-zinc-400 dark:text-zinc-500">
        * React is technically a UI library, not a framework — it handles rendering but leaves routing, data fetching, and structure to you. We include it here because it&rsquo;s the foundation most frameworks (like Next.js) are built on.
      </p>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-500 dark:text-zinc-300">
          Which one should you pick?
        </p>
        <p>
          The best framework is the one your team knows and your project needs.
          They all solve the same core problems differently &mdash; the
          trade-offs are in bundle size, learning curve, ecosystem, and how
          opinionated the framework is.
        </p>
        <p>
          There is no single &ldquo;best&rdquo;. Pick one, learn it well, and
          the concepts will transfer when you try another.
        </p>
      </div>
    </div>
  );
}
