import type { Metadata } from "next";
import { TabletSmartphone, Search, Layers } from "lucide-react";
import ResponsiveDemo from "./ResponsiveDemo";
import SectionLabel from "@/app/components/ui/SectionLabel";
import Card from "@/app/components/ui/Card";

const problems = [
  {
    icon: TabletSmartphone,
    title: "Locked-Out Users",
    description:
      "Over half of web traffic is mobile. A desktop-only layout is unusable for the majority of your audience.",
  },
  {
    icon: Search,
    title: "SEO Penalty",
    description:
      "Search engines penalize non-responsive sites, pushing you down in results regardless of your content.",
  },
  {
    icon: Layers,
    title: "Double Maintenance",
    description:
      "Separate mobile and desktop codebases means every change is done twice, and bugs are found half as fast.",
  },
];

export const metadata: Metadata = {
  title: "Responsive Design | Frontend 101",
  description: "Responsive layouts adapt to the screen size.",
};

export default function ResponsivenessPage() {
  return (
    <div className="flex flex-col gap-8 text-sm lg:text-base">
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Responsiveness
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Drag, tap, or resize to see how layouts adapt to different screen
          sizes.
        </p>
      </div>

      <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>What is responsive design?</SectionLabel>
        <p>
          Responsive design is a single codebase that adapts its layout to any
          screen size (phone, tablet, or desktop). Instead of building separate
          mobile and desktop versions of your site, you write one set of HTML
          and CSS that reorganizes itself based on the available space.
        </p>
        <p>
          The core tool is the <span className="italic text-zinc-700 dark:text-zinc-300">CSS breakpoint:</span>{" "}a rule that
          says &ldquo;when the screen is wider than X pixels, apply these
          styles.&rdquo; Below that width, a different set of styles takes over.
          This is how a three-column desktop grid can collapse into a
          single-column mobile stack without changing any HTML.
        </p>
        <p>
          Other key techniques: flexible grids where columns resize
          proportionally, relative units like <code className="text-zinc-800 dark:text-zinc-200">rem</code> and{" "}
          <code className="text-zinc-800 dark:text-zinc-200">%</code> instead of fixed pixels, and images that scale
          with their container.
        </p>
      </div>

      <div className="text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>Why it matters</SectionLabel>
        <p>
          Over half of all web traffic comes from mobile devices. If your layout
          only works on a desktop monitor, you&rsquo;re locking out the majority
          of your users.
        </p>
        <p>
          Responsive design isn&rsquo;t a bonus feature; it&rsquo;s the
          expected baseline. Search engines penalize non-responsive sites, and
          users will leave if they have to pinch-zoom to read text. One
          responsive codebase is also far cheaper to maintain than separate
          mobile and desktop versions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 !mt-4">
          {problems.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="space-y-2 sm:p-5">
              <div className="flex items-center gap-2.5">
                <Icon className="size-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {title}
                </p>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel className="mb-4">Interactive demo</SectionLabel>
        <ResponsiveDemo />
      </div>

      <div className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 space-y-3">
        <SectionLabel>How it works</SectionLabel>
        <p>
          CSS breakpoints let you apply different styles based on the viewport
          width. The preview above simulates this by letting you control the
          container width directly.
        </p>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-xs lg:text-sm">
          <li>
            <strong>mobile</strong>: single column, hamburger menu, stacked
            footer
          </li>
          <li>
            <strong>tablet</strong> (640px+): two-column grid, nav links
            visible, inline footer
          </li>
          <li>
            <strong>desktop</strong> (1024px+): three-column grid, full width
          </li>
        </ul>
        <p>
          Use the device buttons to snap to common sizes, or drag the handle on
          the right edge to resize freely and watch the layout adapt.
        </p>
      </div>
    </div>
  );
}
