import type { Metadata } from "next";
import { FileCode, GitFork, RefreshCw } from "lucide-react";
import DomDemo from "./DomDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import Card from "@/app/components/ui/Card";

const problems = [
  {
    icon: FileCode,
    title: "It's Not the HTML",
    description:
      "Developers often assume the DOM is their HTML. It's actually a live object model the browser constructs, and JavaScript can change it after the page loads.",
  },
  {
    icon: GitFork,
    title: "Invisible Structure",
    description:
      "Without understanding the tree, selecting the right element, traversing to a parent, or inserting a node feels like guesswork.",
  },
  {
    icon: RefreshCw,
    title: "Performance Blind Spots",
    description:
      "Every DOM mutation can trigger layout recalculation and repaint. Not knowing how the tree works leads to janky, slow UIs.",
  },
];

export const metadata: Metadata = {
  title: "The DOM | Frontend 101",
  description: "The live tree the browser builds from your HTML.",
};

export default function TheDomPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          The DOM
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          The live tree the browser builds from your HTML.
        </p>
      </div>

      <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What is the DOM?</SectionLabel>
        <p>
          The DOM — Document Object Model — is a tree-shaped, in-memory
          representation of your page. When the browser loads an HTML file, it
          doesn&rsquo;t just display the text; it parses it and builds a live
          data structure of objects called <em className="text-zinc-700 dark:text-zinc-300">nodes</em>.
        </p>
        <p>
          Every HTML element becomes a node in that tree. Nesting in your markup
          becomes parent-child relationships in the tree: a{" "}
          <code className="text-zinc-800 dark:text-zinc-200">&lt;p&gt;</code>{" "}
          inside a{" "}
          <code className="text-zinc-800 dark:text-zinc-200">&lt;div&gt;</code>{" "}
          becomes a child node of that div node.
        </p>
        <p>
          JavaScript interacts with this tree directly — not with the HTML
          source. Methods like{" "}
          <code className="text-zinc-800 dark:text-zinc-200">document.querySelector</code>,{" "}
          <code className="text-zinc-800 dark:text-zinc-200">element.textContent</code>, and{" "}
          <code className="text-zinc-800 dark:text-zinc-200">element.appendChild</code>{" "}
          all read from or write to the DOM. The HTML file on disk stays
          untouched — the DOM is what the browser actually renders.
        </p>
      </div>

      <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          The DOM is the bridge between your code and what users see on screen.
          Every UI library and framework — React, Vue, Svelte — ultimately
          manipulates the DOM. Understanding the tree gives you a mental model
          for why UIs behave the way they do.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 !mt-4">
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

      <div>
        <SectionLabel className="mb-3">Interactive demo</SectionLabel>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Click any node in the tree to inspect its properties. Select a node,
          then type a tag name and add it as a child. Remove nodes with the{" "}
          <span className="font-mono text-xs">×</span> button. The generated
          HTML updates live as you build the tree.
        </p>
        <DomDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          The demo renders the DOM as a visual tree. Each node is clickable —
          selecting one opens the inspector on the right, which shows the same
          properties the browser exposes to JavaScript.
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>tagName</strong>: the element&rsquo;s HTML tag (e.g.{" "}
            <code>div</code>, <code>h1</code>)
          </li>
          <li>
            <strong>children</strong>: how many child nodes the element contains
          </li>
          <li>
            <strong>textContent</strong>: the text inside the element, if any
          </li>
          <li>
            <strong>parentNode</strong>: which node is one level up in the tree
          </li>
        </ul>
        <p>
          Adding or removing a node is an immutable update — a new tree is
          computed and React re-renders just what changed. This mirrors how
          virtual DOM libraries like React work under the hood.
        </p>
      </div>
    </div>
  );
}
