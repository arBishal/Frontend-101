import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import { HardDrive, UserX, RefreshCw } from "lucide-react";
import ApiDemo from "./ApiDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import ProblemCards from "@/app/components/ProblemCards";

const problems = [
  {
    icon: HardDrive,
    title: "Hardcoded Data",
    description:
      "Without APIs, every piece of data would need to be baked into the page. No dynamic content at all.",
  },
  {
    icon: UserX,
    title: "No Personalization",
    description:
      "User profiles, preferences, and account data all live on a server. No API means no user-specific experience.",
  },
  {
    icon: RefreshCw,
    title: "No Live Updates",
    description:
      "Prices change, feeds refresh, notifications arrive. Without API calls, your UI shows stale data forever.",
  },
];

export const metadata = conceptMetadata("api-calls");
const concept = getConcept("api-calls");

export default function ApiCallsPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What is an API call?</SectionLabel>
        <p>
          An API call is how the frontend asks a server for data. Your app
          doesn&rsquo;t store everything locally: user profiles, product
          listings, weather forecasts. That data lives on a server. The frontend
          sends an HTTP request, the server processes it, and sends back a
          response (usually JSON).
        </p>
        <p>
          The browser has a built-in function for this:{" "}
          <code className="text-zinc-800 dark:text-zinc-200">fetch()</code>. You give it a URL, it sends a request,
          and returns a promise that resolves with the server&rsquo;s response.
          The four standard request types are:
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li><span className="italic text-zinc-700 dark:text-zinc-300">GET</span> — read data</li>
          <li><span className="italic text-zinc-700 dark:text-zinc-300">POST</span> — create data</li>
          <li><span className="italic text-zinc-700 dark:text-zinc-300">PUT</span> — update data</li>
          <li><span className="italic text-zinc-700 dark:text-zinc-300">DELETE</span> — remove data</li>
        </ul>
        <p>
          API stands for Application Programming Interface, a contract that
          defines how two systems talk to each other. A REST API
          organizes its data into URLs called endpoints:{" "}
          <code className="text-zinc-800 dark:text-zinc-200">/users/42</code>{" "}returns user #42,{" "}
          <code className="text-zinc-800 dark:text-zinc-200">/pokemon/pikachu</code>{" "}returns Pikachu&rsquo;s stats.
        </p>
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          Almost every real application depends on external data. A social feed
          loads posts from a server. A weather app fetches forecasts from an
          API. A checkout page sends your order to a payment service.
        </p>
        <p>
          Without APIs, every piece of data would need to be hardcoded into the
          page: no dynamic content, no personalization, no real-time updates.
          Understanding the request lifecycle (idle, loading, success, error) is
          essential for building UIs that feel reliable even when the network
          is slow or the server is down.
        </p>
        <ProblemCards problems={problems} />
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
          This demo fetches a Pokémon by name or ID from{" "}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            PokéAPI
          </a>
          {" "}— a free, public REST API with no sign-up. Before you fetch:
          which of the four states — empty, loading, success, error — is on
          screen right now, and which one shows up if you search a name that
          doesn&rsquo;t exist?
        </p>
        <ApiDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          Type a name or ID and hit Fetch. Flip on{" "}
          <span className="italic text-zinc-700 dark:text-zinc-300">Simulate Slow Network</span>{" "}
          to stretch the loading state long enough to actually watch it. Two
          things move in step: the line just below the search bar says in plain
          words what&rsquo;s happening, and its color shifts with the state —
          grey when empty, amber while loading, green on success, red on error.
          The reset icon next to it drops you back to empty. The Network
          Inspector beside it shows the raw request data, the same information
          you&rsquo;d find in your browser&rsquo;s DevTools Network tab.
        </p>
        <p>
          Every fetch lands in one of four states, and beginners tend to build
          only the last one. <strong>Empty</strong> is the screen before anyone
          asks for data. <strong>Loading</strong> is the wait. <strong>Success</strong>{" "}
          is the happy path — the part that&rsquo;s easy to remember. <strong>Error</strong>{" "}
          is the 404, the dropped connection, the mistyped name. Ship only the
          success case and your UI shows a blank box on a slow network and a
          dead screen when the server is down.
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>fetch()</strong>: the browser&apos;s built-in function for
            making HTTP requests
          </li>
          <li>
            <strong>GET</strong>: the HTTP method used to read data from a
            server
          </li>
          <li>
            <strong>response</strong>: the server&apos;s answer, parsed from
            JSON into a JavaScript object
          </li>
        </ul>
        <p className="text-zinc-700 dark:text-zinc-300">Try breaking it:</p>
        <ul className="list-disc list-inside space-y-1.5">
          <li>
            Fetch <code className="text-zinc-800 dark:text-zinc-200">pikachu</code>,
            then fetch{" "}
            <code className="text-zinc-800 dark:text-zinc-200">notapokemon</code>{" "}
            — watch the state line flip from green success to red error.
          </li>
          <li>
            Turn on Slow Network and read the amber loading line before the data
            lands — the state most beginners never design a screen for.
          </li>
          <li>
            With Slow Network on, hit Fetch twice quickly. Only the second
            request resolves — the first is aborted so a stale response
            can&rsquo;t overwrite a newer one.
          </li>
        </ul>
        <p>
          Turning that error state from a red line into something a user can
          recover from — a retry, a fallback, a message that explains what went
          wrong — is its own topic, and it&rsquo;s where a future Error Handling
          page will pick up.
        </p>
      </div>
    </div>
  );
}
