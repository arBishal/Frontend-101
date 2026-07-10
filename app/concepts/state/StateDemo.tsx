"use client";

import { useState, useEffect } from "react";
import { Heart, UserPlus, UserCheck } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

function ValueDisplay({ type, children }: { type: "string" | "boolean" | "number"; children: React.ReactNode }) {
  const color = {
    string: "text-emerald-400",
    boolean: "text-amber-400",
    number: "text-sky-400",
  }[type];

  return <span className={color}>{children}</span>;
}

export default function StateDemo() {
  const [name, setName] = useState("Batman");
  const [following, setFollowing] = useState(false);
  const [likes, setLikes] = useState(0);
  const [avatarSeed, setAvatarSeed] = useState<string | null>(null);

  useEffect(() => {
    setAvatarSeed(Math.random().toString(36).slice(2));
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Profile Card */}
      <div className="flex justify-center md:justify-between items-center w-full rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6">
        {/* Avatar + Name + Follow + Heart */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-4">
          {avatarSeed ? (
            <img
              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${avatarSeed}`}
              alt="Harry Dresden"
              className="size-12 md:size-14 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800"
            />
          ) : (
            <div className="size-12 md:size-14 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          )}
          <div className="w-full flex flex-col md:flex-row justify-between items-center min-w-0 gap-4 md:gap-6">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full"
              aria-label="Profile name"
            />
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => setFollowing(!following)}
                className="text-xs px-1 py-1"
              >
                {following ? (
                  <>
                    <UserCheck className="size-3.5" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="size-3.5" />
                    Follow
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setLikes((prev) => prev + 1)}
                className="text-xs px-1 py-1"
              >
                <Heart
                  className={`size-3.5 transition-colors ${likes > 0 ? "fill-red-500 text-red-500" : ""}`}
                />
                {likes}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* State Inspector */}
      <div className="w-full sm:w-1/3 shrink-0 rounded-lg bg-zinc-900 dark:bg-zinc-800 p-4 font-mono text-sm">
        <p className="text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-3">
          State Inspector
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between gap-3">
            <span className="text-zinc-400">name</span>
            <ValueDisplay type="string">&quot;{name}&quot;</ValueDisplay>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-zinc-400">following</span>
            <ValueDisplay type="boolean">{String(following)}</ValueDisplay>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-zinc-400">likes</span>
            <ValueDisplay type="number">{likes}</ValueDisplay>
          </div>
        </div>
      </div>
    </div>
  );
}
