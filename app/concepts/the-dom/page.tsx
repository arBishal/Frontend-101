import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import Takeaway from "@/app/components/ui/Takeaway";
import { FileCode, GitFork, RefreshCw } from "lucide-react";
import DomDemo from "./DomDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import ProblemCards from "@/app/components/ProblemCards";

const problems = [
  {
    icon: FileCode,
    title: "Gone on reload",
    description:
      "Add a row with JavaScript and it appears at once. Reload the page and it has vanished. The DOM changed; the file it was built from never did, so nothing survived the refresh.",
  },
  {
    icon: GitFork,
    title: "Grab the wrong node",
    description:
      "Target the wrong element and your click handler runs on nothing, silently.",
  },
  {
    icon: RefreshCw,
    title: "Slow when it's sloppy",
    description:
      "Every change to the tree makes the browser re-check what to draw. A handful of edits costs nothing. Rebuild the whole list on every keystroke and the page starts to stutter under the user's fingers.",
  },
];

export const metadata = conceptMetadata("the-dom");
const concept = getConcept("the-dom");

export default function TheDomPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-sm lg:text-base text-muted space-y-3">
        <SectionLabel>What is the DOM?</SectionLabel>
        <p>
          The DOM (Document Object Model) is the live tree of objects the browser
          builds from your HTML and holds in memory. When a page loads, the
          browser reads your markup once and turns it into a structure it can
          change on the fly. Every element becomes a{" "}
          <em className="text-body">node</em>, an object
          in that tree, and the nesting in your HTML becomes parent-and-child
          links between nodes: a{" "}
          <code className="text-code">&lt;p&gt;</code>{" "}
          inside a{" "}
          <code className="text-code">&lt;div&gt;</code>{" "}
          is a child of that div node.
        </p>
        <p>
          Here is what trips people up: that live tree and your HTML file are not
          the same thing. The file is read once to build the tree and then set
          aside. Everything after that happens in the DOM. A row you add in
          JavaScript shows up on screen instantly, while the HTML on disk still
          shows the empty list you first shipped. Right-click a busy page, choose
          View Source, and hunt for something you can plainly see on screen. If
          JavaScript put it there, it is not in the source at all.
        </p>
        <p>
          A useful way to picture it: your HTML is a printed recipe and the DOM
          is the plated dish on the table. The recipe is written once and never
          changes on the page. The dish is what people actually eat, and the cook
          (your JavaScript) keeps adjusting it after it leaves the kitchen,
          adding a garnish here, swapping a side there. The recipe card on the
          counter never updates to match.
        </p>
      </div>

      <div className="text-sm lg:text-base text-muted space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          The DOM is the bridge between your code and what a user sees on screen.
          Every UI framework, from React to Svelte, ultimately reads and writes
          the DOM; once you can picture the tree, you have a model for why an
          interface behaves the way it does and where to reach in to change it.
        </p>
        <p>
          Miss that model and the everyday work turns into guesswork: selecting
          the right element, walking up to its parent, dropping a new node in the
          right place. The problems below are the ones that bite first.
        </p>
        <ProblemCards problems={problems} />
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <p className="text-muted mb-4">
          Before you touch it: if you delete the{" "}
          <code className="text-code">&lt;div&gt;</code>,
          what happens to the{" "}
          <code className="text-code">&lt;p&gt;</code> and{" "}
          <code className="text-code">&lt;span&gt;</code>{" "}
          nested inside it? Click a node to inspect it, add or remove nodes, and
          watch the panels below compare the HTML you wrote against the live DOM.
        </p>
        <DomDemo />
        <p className="text-body mt-6 mb-2">Try breaking it:</p>
        <ul className="list-disc list-inside space-y-1.5 text-muted">
          <li>
            Delete the{" "}
            <code className="text-code">&lt;div&gt;</code>.
            The live DOM drops it and everything nested inside, so why does the
            Source panel turn red over those lines instead of simply removing
            them?
          </li>
          <li>
            Add a{" "}
            <code className="text-code">&lt;button&gt;</code>{" "}
            under{" "}
            <code className="text-code">&lt;body&gt;</code>.
            It shows up green in the live DOM and never appears in the Source,
            because the Source is frozen at what you first wrote.
          </li>
          <li>
            Select a node, add a child to it, then select its parent and watch{" "}
            <code className="text-code">children</code>{" "}
            climb by one in the inspector.
          </li>
        </ul>
      </div>

      <div className="text-sm lg:text-base text-muted space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          The tree on the left is the DOM. Click any node to open the inspector,
          which reports the same properties the browser hands your JavaScript.
          Type a tag name and optional text to add a child to the selected node,
          or use the{" "}
          <span className="font-mono text-xs">×</span> to remove one. The two
          panels underneath hold the frozen source next to the live DOM, the
          recipe held up against the actual plate, so you can see exactly where
          they have drifted apart.
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>tagName</strong>: the element’s HTML tag (e.g.{" "}
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
          Notice that the source panel never moved, no matter how much you
          edited. That is the whole point: your HTML is read once to build the
          tree, and every edit after that lives in the DOM alone. The browser
          renders the tree, not the file.
        </p>
        <p>
          Writing those tree edits by hand gets tedious fast, which is the job
          frameworks like React take over for you, a story the Frameworks page
          picks up.
        </p>
      </div>

      <Takeaway>
        The DOM is not the HTML you wrote; it’s what the browser actually
        renders, and what your code changes.
      </Takeaway>
    </div>
  );
}
