import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import { FileCode, GitFork, RefreshCw } from "lucide-react";
import DomDemo from "./DomDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import ProblemCards from "@/app/components/ProblemCards";

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

export const metadata = conceptMetadata("the-dom");
const concept = getConcept("the-dom");

export default function TheDomPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
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

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          The DOM is the bridge between your code and what users see on screen.
          Every UI library and framework — React, Vue, Svelte — ultimately
          manipulates the DOM. Understanding the tree gives you a mental model
          for why UIs behave the way they do.
        </p>
        <ProblemCards problems={problems} />
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Click any node in the tree to inspect its properties. Select a node,
          then type a tag name (and optional text) and add it as a child.
          Remove nodes with the{" "}
          <span className="font-mono text-xs">×</span> button. The panels below
          contrast the HTML you wrote with the live DOM, with the differences
          highlighted.
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
