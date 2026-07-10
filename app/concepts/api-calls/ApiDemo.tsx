"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Card from "@/app/components/ui/Card";
import InspectorPanel from "@/app/components/ui/InspectorPanel";

type Status = "idle" | "loading" | "success" | "error";

type PokemonData = {
  name: string;
  sprite: string;
  types: string[];
};

const typeColors: Record<string, string> = {
  fire: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  water: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  grass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  electric: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  poison: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  bug: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400",
  normal: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  flying: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  psychic: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  ground: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const defaultTypeColor = "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";

const statusColors: Record<Status, string> = {
  idle: "text-zinc-400",
  loading: "text-amber-400",
  success: "text-emerald-400",
  error: "text-red-400",
};

export default function ApiDemo() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<PokemonData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [simulateDelay, setSimulateDelay] = useState(false);

  async function handleFetch() {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return;

    const requestUrl = `https://pokeapi.co/api/v2/pokemon/${trimmed}`;
    setUrl(requestUrl);
    setStatus("loading");
    setData(null);
    setError(null);
    setResponseTime(null);

    const start = performance.now();

    if (simulateDelay) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    try {
      const response = await fetch(requestUrl);
      const elapsed = Math.round(performance.now() - start);
      setResponseTime(elapsed);

      if (!response.ok) {
        throw new Error("Pokemon not found");
      }

      const json = await response.json();
      setData({
        name: json.name,
        sprite: json.sprites.front_default,
        types: json.types.map((t: { type: { name: string } }) => t.type.name),
      });
      setStatus("success");
    } catch {
      const elapsed = Math.round(performance.now() - start);
      setResponseTime(elapsed);
      setError("Pokemon not found. Try another name or ID.");
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Request Card */}
      <Card className="w-full space-y-5">
        <div className="flex gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetch()}
            placeholder="Example: Snorlax"
            className="flex-1 min-w-0"
            aria-label="Pokemon name or ID"
          />
          <Button
            onClick={handleFetch}
            disabled={status === "loading" || !query.trim()}
            className="px-4 py-2 text-sm"
          >
            <Search className="size-4" />
            Fetch
          </Button>
        </div>

        {/* Result area */}
        <div className="min-h-32 flex items-center justify-center">
          {status === "idle" && (
            <p className="text-sm text-zinc-400 dark:text-zinc-500 text-center">
              Enter a Pokemon name or ID and hit Fetch.
            </p>
          )}

          {status === "loading" && (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Loader2 className="size-4 animate-spin" />
              Fetching...
            </div>
          )}

          {status === "success" && data && (
            <div className="flex items-center gap-4">
              {data.sprite && (
                <img
                  src={data.sprite}
                  alt={data.name}
                  className="size-24 md:size-32 shrink-0 pixelated"
                  style={{ imageRendering: "pixelated" }}
                />
              )}
              <div className="space-y-2">
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50 capitalize">
                  {data.name}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {data.types.map((type) => (
                    <span
                      key={type}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${typeColors[type] ?? defaultTypeColor}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {status === "error" && (
            <p className="text-sm text-red-500 dark:text-red-400 text-center">
              {error}
            </p>
          )}
        </div>
      </Card>

      {/* Network Inspector */}
      <InspectorPanel title="Network Inspector">
        <label className="flex items-center gap-2 text-xs text-zinc-500 cursor-pointer select-none mb-4">
          <input
            type="checkbox"
            checked={simulateDelay}
            onChange={(e) => setSimulateDelay(e.target.checked)}
            className="accent-zinc-100"
          />
          Simulate Slow Network
        </label>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between gap-3">
            <span className="text-zinc-400">status</span>
            <span className={statusColors[status]}>
              &quot;{status}&quot;
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-zinc-400">method</span>
            <span className="text-emerald-400">&quot;GET&quot;</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-zinc-400">url</span>
            <span className="text-emerald-400 truncate text-right max-w-32" title={url ?? undefined}>
              {url ? `".../${url.split("/").pop()}"` : <span className="text-zinc-600">&mdash;</span>}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-zinc-400">time</span>
            <span className="text-sky-400">
              {responseTime !== null ? `${responseTime}ms` : <span className="text-zinc-600">&mdash;</span>}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-zinc-400">response</span>
            <span className="text-zinc-600">
              {status === "success" && (
                <span className="text-emerald-400">{"{ name, types, sprites }"}</span>
              )}
              {status === "error" && (
                <span className="text-red-400">404</span>
              )}
              {(status === "idle" || status === "loading") && <>&mdash;</>}
            </span>
          </div>
        </div>
      </InspectorPanel>
    </div>
  );
}
