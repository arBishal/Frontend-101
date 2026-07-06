import {
  Monitor,
  Puzzle,
  ToggleRight,
  Cloud,
  Code,
  Eye,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Concept = {
  slug: string;
  title: string;
  description: string;
  status: "available" | "coming-soon";
  icon: LucideIcon;
};

export const concepts: Concept[] = [
  {
    slug: "responsiveness",
    title: "Responsive Design",
    description: "Making layouts adapt to any screen size.",
    status: "available",
    icon: Monitor,
  },
  {
    slug: "components",
    title: "Components",
    description: "Why we build UIs out of reusable pieces.",
    status: "available",
    icon: Puzzle,
  },
  {
    slug: "state",
    title: "State",
    description: "How apps remember things that change.",
    status: "available",
    icon: ToggleRight,
  },
  {
    slug: "api-calls",
    title: "API Calls",
    description: "How the frontend asks a server for data.",
    status: "available",
    icon: Cloud,
  },
  {
    slug: "frameworks",
    title: "Why Frameworks Exist",
    description: "The manual pain frameworks were built to remove.",
    status: "available",
    icon: Code,
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    description: "Making sure the UI works for everyone.",
    status: "available",
    icon: Eye,
  },
];
