export type Concept = {
  slug: string;
  title: string;
  description: string;
  status: "available" | "coming-soon";
};

export const concepts: Concept[] = [
  {
    slug: "responsiveness",
    title: "Responsive Design",
    description: "Making layouts adapt to any screen size.",
    status: "available",
  },
  {
    slug: "components",
    title: "Components",
    description: "Why we build UIs out of reusable pieces.",
    status: "available",
  },
  {
    slug: "state",
    title: "State",
    description: "How apps remember things that change.",
    status: "available",
  },
  {
    slug: "api-calls",
    title: "API Calls",
    description: "How the frontend asks a server for data.",
    status: "available",
  },
  {
    slug: "frameworks",
    title: "Why Frameworks Exist",
    description: "The manual pain frameworks were built to remove.",
    status: "available",
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    description: "Making sure the UI works for everyone.",
    status: "available",
  },
];
