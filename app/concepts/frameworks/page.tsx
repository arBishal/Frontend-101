import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MousePointerClick, RefreshCw, Puzzle, Route } from "lucide-react";
import SectionLabel from "@/app/components/ui/SectionLabel";
import Card from "@/app/components/ui/Card";

export const metadata: Metadata = {
  title: "Why Frameworks Exist | Frontend 101",
  description: "The manual pain frameworks were built to remove.",
};

const problems = [
  {
    icon: MousePointerClick,
    title: "DOM Manipulation",
    description:
      "Manually creating, updating, and removing HTML elements is tedious and error-prone. Frameworks do it automatically.",
  },
  {
    icon: RefreshCw,
    title: "State \u2194 UI Sync",
    description:
      "When data changes, the UI must update. Frameworks track this relationship so you don\u2019t have to.",
  },
  {
    icon: Puzzle,
    title: "Component Reuse",
    description:
      "Build a button once, use it everywhere. Frameworks make composition natural.",
  },
  {
    icon: Route,
    title: "Routing & Structure",
    description:
      "Multi-page apps need navigation, layouts, data loading. Frameworks provide conventions for all of this.",
  },
];

export default function FrameworksPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Why Frameworks Exist
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          The manual pain frameworks were built to remove.
        </p>
      </div>

      {/* What is a Framework? */}
      <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What is a framework?</SectionLabel>
        <p>
          A framework is a pre-built foundation that handles the repetitive,
          error-prone parts of building UIs &mdash; DOM updates, state
          management, routing, event handling.
        </p>
        <p>
          Instead of telling the browser <em>how</em> to update the page step by
          step, you describe <em>what</em> the UI should look like. The
          framework figures out the rest.
        </p>
        <p>
          Think of it this way: writing vanilla HTML and JavaScript is like
          giving turn-by-turn directions. A framework is like saying &ldquo;take
          me to the airport&rdquo; &mdash; it handles the route.
        </p>
      </div>

      {/* What Problems Do They Solve? */}
      <div>
        <SectionLabel className="mb-4">What problems do they solve?</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {problems.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="space-y-2 sm:p-5">
              <div className="flex items-center gap-2.5">
                <Icon className="size-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {title}
                </p>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
        <p>
          Frameworks aren&rsquo;t magic &mdash; they&rsquo;re JavaScript
          libraries with smart abstractions. This entire site is built with{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">Next.js</strong>,
          which is built on{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">React</strong>.
        </p>
        <Link
          href="/concepts/frameworks/see-the-diff"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
        >
          Next, see the difference for yourself
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
