import {
  Network,
  Monitor,
  Puzzle,
  ToggleRight,
  Cloud,
  Code,
  Eye,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";

export type ConceptChild = {
  slug: string;
  title: string;
};

export type Concept = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children?: ConceptChild[];
};

export const concepts: Concept[] = [
  {
    slug: "the-dom",
    title: "The DOM",
    description: "The live tree the browser builds from your HTML.",
    icon: Network,
  },
  {
    slug: "responsiveness",
    title: "Responsiveness",
    description: "Making layouts adapt to any screen size.",

    icon: Monitor,
  },
  {
    slug: "components",
    title: "Components",
    description: "Why we build UIs out of reusable pieces.",

    icon: Puzzle,
  },
  {
    slug: "state",
    title: "State",
    description: "How apps remember things that change.",

    icon: ToggleRight,
  },
  {
    slug: "api-calls",
    title: "API Calls",
    description: "How the frontend asks a server for data.",

    icon: Cloud,
  },
  {
    slug: "frameworks",
    title: "Frameworks",
    description: "The manual pain frameworks were built to remove.",

    icon: Code,
    children: [
      { slug: "frameworks", title: "Overview" },
      { slug: "frameworks/see-the-diff", title: "See the Difference" },
      { slug: "frameworks/landscape", title: "Landscape" },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    description: "Making sure the UI works for everyone.",

    icon: Eye,
  },
];

/** Single source of truth: look a concept up by slug. Throws on unknown slug. */
export function getConcept(slug: string): Concept {
  const concept = concepts.find((c) => c.slug === slug);
  if (!concept) throw new Error(`Unknown concept slug: "${slug}"`);
  return concept;
}

/** Page metadata derived from the registry, so title/description never drift. */
export function conceptMetadata(slug: string): Metadata {
  const { title, description } = getConcept(slug);
  return { title: `${title} | Frontend 101`, description };
}
