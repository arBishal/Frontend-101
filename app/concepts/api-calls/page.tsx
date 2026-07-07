import type { Metadata } from "next";
import ApiDemo from "./ApiDemo";

export const metadata: Metadata = {
  title: "API Calls | Frontend 101",
  description: "How the frontend asks a server for data.",
};

export default function ApiCallsPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          API Calls
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          How the frontend asks a server for data.
        </p>
      </div>

      <div>
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-400 dark:text-zinc-500 mb-4">
          Interactive demo
        </p>
        <ApiDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <p className="font-mono uppercase tracking-wide font-medium text-zinc-400 dark:text-zinc-500">
          How it works
        </p>
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
            <strong>fetch()</strong> — the browser&apos;s built-in function for
            making HTTP requests
          </li>
          <li>
            <strong>GET</strong> — the HTTP method used to read data from a
            server
          </li>
          <li>
            <strong>response</strong> — the server&apos;s answer, parsed from
            JSON into a JavaScript object
          </li>
        </ul>
        <p>
          The demo uses PokeAPI, a free public REST API. The Network Inspector
          shows what&apos;s happening behind the scenes — the same information
          you&apos;d see in your browser&apos;s DevTools Network tab.
        </p>
      </div>
    </div>
  );
}
