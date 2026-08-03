import { getConcept, conceptMetadata } from "@/app/lib/concepts";
import Takeaway from "@/app/components/ui/Takeaway";
import { EyeOff, Loader, Signal } from "lucide-react";
import ApiDemo from "./ApiDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ConceptHeader from "@/app/components/ConceptHeader";
import ProblemCards from "@/app/components/ProblemCards";

const problems = [
  {
    icon: EyeOff,
    title: "Nothing loads on its own",
    description:
      "Almost everything an app displays, prices, feeds, profiles, does not ship with the app. It has to be fetched, or the screen has nothing to show.",
  },
  {
    icon: Loader,
    title: "Time and failure, built in",
    description:
      "A fetch can be slow or fail outright, in a way a hardcoded value never can. That is not an edge case, it is the normal behavior of a network.",
  },
  {
    icon: Signal,
    title: "Staying current",
    description:
      "Data on a server keeps changing after the app is installed. Fetching it is the only way what a user sees stays true to what is actually there.",
  },
];

export const metadata = conceptMetadata("api-calls");
const concept = getConcept("api-calls");

export default function ApiCallsPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <ConceptHeader title={concept.title} subtitle={concept.description} />

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>What is an API call?</SectionLabel>
        <p>
          Open a weather app and it shows 14°C for your city. That number was
          not baked into the app when you installed it, and it changes by the
          hour, so where does it come from? The app asks a server for it, every
          time you open the screen. That request is an API call.
        </p>
        <p>
          Most of what an app shows does not live inside the app. Your profile
          photo, the prices in a store, the weather on your lock screen, the
          unread badge on an inbox, none of it ships with the app; it sits on a
          server and gets fetched. The frontend sends a request over the network
          (the same kind of request your browser makes when it loads a page),
          the server does its work, and it sends back a response, usually as{" "}
          <span className="text-body italic">JSON</span>, a plain-text format
          for structured data that JavaScript can read straight into an object.
          The browser has a built-in function for making that request:{" "}
          <code className="text-code">fetch()</code>. You give it a URL, it
          sends the request, and it hands you the response when the server
          answers.
        </p>
        <p>
          Think of it like ordering at a restaurant. You never walk into the
          kitchen; you give your order to a waiter, who carries it back and
          returns with the dish. The kitchen is the server, the order is your
          request, the dish is the response, and the menu is the set of things
          you are allowed to ask for. Two things about that trip matter more
          than beginners expect: it takes time, and sometimes the kitchen is out
          of the salmon. A request can come back slowly, and it can come back
          with nothing at all.
        </p>
      </div>

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          Almost every real app runs on data it fetches. Open a social feed and
          every post in it arrived from a server a moment before you saw it.
          Learn to fetch data and you can build the part of the frontend that
          actually does something.
        </p>
        <p>
          The catch is the round trip. Reading a value already in your code is
          instant and certain; a fetch is neither. It travels out over a network
          you do not control and comes back later, or slowly, or not at all. So
          a screen that fetches data is really four screens: before the request,
          during the wait, on success, and on failure. Beginners build the third
          one and forget the other three.
        </p>
        <ProblemCards problems={problems} />
      </div>

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>The four request methods</SectionLabel>
        <p>
          Every API call carries a{" "}
          <span className="text-body italic">method</span>: one word that tells
          the server what you want done. Four of them cover almost everything
          you will do:
        </p>
        <ul className="list-inside list-disc space-y-1.5">
          <li>
            <code className="text-code">GET</code> reads data that already
            exists, without changing it (load the comments on a post).
          </li>
          <li>
            <code className="text-code">POST</code> creates something new (post
            a new comment).
          </li>
          <li>
            <code className="text-code">PUT</code> updates an existing item with
            new values (edit that comment).
          </li>
          <li>
            <code className="text-code">DELETE</code> removes an item (delete
            that comment).
          </li>
        </ul>
        <p>
          <code className="text-code">GET</code> only reads; the other three
          change data, so they only work against a server built to accept those
          changes. The demo below sticks to{" "}
          <code className="text-code">GET</code>, the request every app makes
          most and the easiest one to watch happen.
        </p>
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <p className="text-subtle mb-4 text-sm">
          This demo fetches a Pokémon by name or ID from{" "}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-strong underline underline-offset-2 transition-colors"
          >
            PokéAPI
          </a>
          , a free public API with no sign-up. Before you fetch: which of the
          four states (idle, loading, success, error) is on screen right now,
          and which one do you think shows up if you search a name that does not
          exist?
        </p>
        <ApiDemo />
        <p className="text-body mt-6 mb-2">Try breaking it:</p>
        <ul className="text-muted list-inside list-disc space-y-1.5">
          <li>
            Fetch <code className="text-code">pikachu</code>, then fetch{" "}
            <code className="text-code">notapokemon</code>. Which of the four
            states does the line land on this time, and what does the inspector
            show for the response?
          </li>
          <li>
            Turn on Simulate Slow Network and fetch again. The amber loading
            line is the state most beginners never build a screen for. What
            would a user see here if you had not?
          </li>
          <li>
            With Slow Network still on, hit Fetch twice in quick succession.
            Both requests go out, but only one updates the screen: the first to
            come back, or the one you asked for last?
          </li>
        </ul>
      </div>

      <div className="text-muted space-y-3 text-sm lg:text-base">
        <SectionLabel>How it works</SectionLabel>
        <p>
          Type a name or ID and hit Fetch. Flip on{" "}
          <span className="text-body italic">Simulate Slow Network</span> to
          stretch the loading state long enough to actually watch it, and use
          the reset icon to drop back to idle. Two things move together: the
          line under the search bar says in plain words what is happening, and
          its color tracks the state, grey when idle, amber while loading, green
          on success, red on error. The Network Inspector beside it shows the
          raw request, the same information your browser’s DevTools Network tab
          would.
        </p>
        <p>
          That color-changing line is the whole lesson in miniature. Every fetch
          moves through four states, the four screens from “Why it matters” seen
          from the request’s side, and the demo makes you visit each one on
          purpose: <strong>idle</strong> is the screen before anyone asks for
          data, <strong>loading</strong> is the wait, <strong>success</strong>{" "}
          is the happy path that is easy to remember, and <strong>error</strong>{" "}
          is the 404, the dropped connection, the mistyped name. Ship only
          success and your UI shows a blank box on a slow network and a dead
          screen when the server is down.
        </p>
        <p>
          The URL the inspector shows is an{" "}
          <span className="text-body italic">endpoint</span>, an address that
          names one thing on the server:{" "}
          <code className="text-code">/pokemon/pikachu</code> returns Pikachu’s
          stats, <code className="text-code">/users/42</code> returns user #42.
          An API that organizes its data into addresses like these is called a
          REST API, and it is by far the most common kind you will meet.
        </p>
        <p>
          Turning that red error line into something a user can recover from, a
          retry button or a message that explains what went wrong, is its own
          topic, and it is where a future Error Handling page will pick up.
        </p>
      </div>

      <Takeaway>
        A fetch is a request over a network, so it takes time and it can fail;
        build the waiting and the failing, not just the moment the data lands.
      </Takeaway>
    </div>
  );
}
