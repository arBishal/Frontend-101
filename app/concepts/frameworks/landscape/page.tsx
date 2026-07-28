import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import { cn } from "@/app/lib/cn";
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

type Framework = {
  name: string;
  icon: { hex: string; path: string };
  philosophy: string;
  users: string[];
  url: string;
  colorOverride?: string;
  darkInvert?: boolean;
};

const frameworks: Framework[] = [
  {
    name: "React",
    icon: siReact,
    philosophy:
      "The most widely used, so the most jobs, tutorials, and ready-made pieces. You build from components and add routing and data-fetching yourself (or reach for Next.js).",
    users: ["Meta", "Netflix", "Airbnb"],
    url: "https://react.dev",
  },
  {
    name: "Next.js",
    icon: siNextdotjs,
    philosophy:
      "React plus the parts it leaves out: routing based on your file structure, server rendering for speed and search engines, and backend code in the same project. It is what this site is built with.",
    users: ["Vercel", "TikTok", "Notion"],
    url: "https://nextjs.org",
    darkInvert: true,
  },
  {
    name: "Vue",
    icon: siVuedotjs,
    philosophy:
      "Known for a gentle learning curve and unusually clear docs. A common first framework.",
    users: ["Alibaba", "GitLab", "Nintendo"],
    url: "https://vuejs.org",
  },
  {
    name: "Nuxt.js",
    icon: siNuxt,
    philosophy:
      "Vue's answer to Next.js: file-based routing, server rendering, and less setup to wire together.",
    users: ["Backmarket", "Ecosia"],
    url: "https://nuxt.com",
  },
  {
    name: "Angular",
    icon: siAngular,
    colorOverride: "#DD0031",
    philosophy:
      "Everything in one box, routing, forms, and data handling, with firm conventions. More to learn up front, less to assemble yourself. Common at large companies.",
    users: ["Google", "Microsoft", "IBM"],
    url: "https://angular.dev",
  },
  {
    name: "Svelte",
    icon: siSvelte,
    philosophy:
      "Does its work in a compile step when you build the app, rather than in the browser, so it ships very little code. Praised for how little boilerplate it asks for.",
    users: ["The New York Times", "GoDaddy"],
    url: "https://svelte.dev",
  },
];

export default function LandscapePage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader
        title="The Current Landscape"
        subtitle="The major frameworks and what makes each one different."
      />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <SectionLabel>Major frameworks</SectionLabel>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Last reviewed July 2026
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {frameworks.map(
            ({
              name,
              icon,
              philosophy,
              users,
              url,
              colorOverride,
              darkInvert,
            }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-default space-y-3 rounded-lg border p-5 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className={cn(
                        "size-5 shrink-0",
                        darkInvert && "dark:invert",
                      )}
                      style={{ fill: colorOverride ?? `#${icon.hex}` }}
                    >
                      <path d={icon.path} />
                    </svg>
                    <p className="text-strong font-semibold">{name}</p>
                  </div>
                  <ExternalLink className="size-3.5 text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-500" />
                </div>
                <p className="text-subtle text-sm">{philosophy}</p>
                <div className="flex flex-wrap gap-1.5">
                  {users.map((user) => (
                    <span
                      key={user}
                      className="bg-inset text-muted rounded px-2 py-0.5 font-mono text-xs"
                    >
                      {user}
                    </span>
                  ))}
                </div>
              </a>
            ),
          )}
        </div>
      </div>

      <p className="text-subtle text-sm">
        * React is technically a UI library, not a framework: it handles
        rendering but leaves routing, data fetching, and structure to you. We
        include it here because it&rsquo;s the foundation most frameworks (like
        Next.js) are built on.
      </p>

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>Which one should you pick?</SectionLabel>
        <p>
          The best framework is the one your team knows and your project needs.
          They all solve the same core problems in different ways; what varies
          is how much code they ship, how much there is to learn, how big the
          community is, and how many decisions the framework makes for you.
        </p>
        <p>
          There is no single &ldquo;best&rdquo;. Pick one, learn it well, and
          the concepts will transfer when you try another.
        </p>
      </div>
    </div>
  );
}
