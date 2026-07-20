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
          This demo fetches a random Pokémon from{" "}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            PokéAPI
          </a>
          {" "}(a free, public REST API). Hit the button and watch the full request lifecycle play out.
        </p>
        <ApiDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          An API call is how the frontend asks a server for data. Instead of
          having everything built into the page, the UI sends a request over
          the network and waits for a response.
        </p>
        <p>
          Every API call follows the same lifecycle. It starts{" "}
          <strong>idle</strong>, moves to <strong>loading</strong> when the
          request is sent, and resolves as either <strong>success</strong>{" "}
          (data arrives) or <strong>error</strong> (something went wrong).
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
        <p>
          The demo uses PokeAPI, a free public REST API. The Network Inspector
          shows what&apos;s happening behind the scenes, the same information
          you&apos;d see in your browser&apos;s DevTools Network tab.
        </p>
      </div>
    </div>
  );
}
