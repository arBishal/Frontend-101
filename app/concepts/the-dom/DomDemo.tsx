"use client";

import { useState, useRef } from "react";
import type React from "react";
import { ChevronRight, ChevronDown, X, Plus } from "lucide-react";
import Card from "@/app/components/ui/Card";
import InspectorPanel from "@/app/components/ui/InspectorPanel";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { cn } from "@/app/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type DomNode = {
  id: string;
  tag: string;
  text?: string;
  children: DomNode[];
};

// ─── Initial tree ─────────────────────────────────────────────────────────────

const INITIAL_TREE: DomNode = {
  id: "1",
  tag: "html",
  children: [
    {
      id: "2",
      tag: "body",
      children: [
        { id: "3", tag: "h1", text: "Hello!", children: [] },
        {
          id: "4",
          tag: "div",
          children: [
            { id: "5", tag: "p", text: "First paragraph", children: [] },
            { id: "6", tag: "span", text: "Styled text", children: [] },
          ],
        },
      ],
    },
  ],
};

// ─── Pure helpers ─────────────────────────────────────────────────────────────

function findNode(tree: DomNode, id: string): DomNode | null {
  if (tree.id === id) return tree;
  for (const child of tree.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

function findParent(tree: DomNode, id: string): DomNode | null {
  for (const child of tree.children) {
    if (child.id === id) return tree;
    const found = findParent(child, id);
    if (found) return found;
  }
  return null;
}

function removeNode(tree: DomNode, id: string): DomNode {
  return {
    ...tree,
    children: tree.children
      .filter((c) => c.id !== id)
      .map((c) => removeNode(c, id)),
  };
}

function addChild(tree: DomNode, parentId: string, child: DomNode): DomNode {
  if (tree.id === parentId) {
    return { ...tree, children: [...tree.children, child] };
  }
  return {
    ...tree,
    children: tree.children.map((c) => addChild(c, parentId, child)),
  };
}

function treeToHtml(node: DomNode, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (node.children.length === 0) {
    if (node.text) return `${pad}<${node.tag}>${node.text}</${node.tag}>`;
    return `${pad}<${node.tag}></${node.tag}>`;
  }
  // A node can have both text and children (e.g. <p>First paragraph<span>…</span></p>)
  // — render the text as its own line before the children, never drop it.
  const childPad = "  ".repeat(indent + 1);
  const textLine = node.text ? `${childPad}${node.text}\n` : "";
  const inner = node.children.map((c) => treeToHtml(c, indent + 1)).join("\n");
  return `${pad}<${node.tag}>\n${textLine}${inner}\n${pad}</${node.tag}>`;
}

// The source never changes once the page loads — computed once, not per render.
const SOURCE_HTML = treeToHtml(INITIAL_TREE);

type DiffRow = {
  source: string | null;
  live: string | null;
  type: "same" | "added" | "removed";
};

// Line-level LCS diff between the frozen source and the live DOM's generated
// HTML. Rows are aligned so both columns render the same number of lines —
// a line that exists on only one side leaves a blank placeholder on the other.
function diffHtml(before: string, after: string): DiffRow[] {
  const a = before.split("\n");
  const b = after.split("\n");
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0),
  );
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] =
        a[i] === b[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const rows: DiffRow[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      rows.push({ source: a[i], live: b[j], type: "same" });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      rows.push({ source: a[i], live: null, type: "removed" });
      i++;
    } else {
      rows.push({ source: null, live: b[j], type: "added" });
      j++;
    }
  }
  while (i < m) {
    rows.push({ source: a[i], live: null, type: "removed" });
    i++;
  }
  while (j < n) {
    rows.push({ source: null, live: b[j], type: "added" });
    j++;
  }
  return rows;
}

// ─── TreeNode (recursive) ─────────────────────────────────────────────────────

type TreeNodeProps = {
  node: DomNode;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

function TreeNode({ node, selectedId, onSelect, onRemove }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;
  const isSelected = node.id === selectedId;
  const isRoot = node.tag === "html" || node.tag === "body";

  // Keyboard model for the row button: Enter/Space select natively (button
  // default), Arrow keys expand/collapse, Delete/Backspace remove.
  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case "ArrowRight":
        if (hasChildren && !expanded) {
          e.preventDefault();
          setExpanded(true);
        }
        break;
      case "ArrowLeft":
        if (hasChildren && expanded) {
          e.preventDefault();
          setExpanded(false);
        }
        break;
      case "Delete":
      case "Backspace":
        if (!isRoot) {
          e.preventDefault();
          onRemove(node.id);
        }
        break;
    }
  }

  return (
    <li>
      <div
        className={cn(
          "group flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-xs select-none",
          isSelected
            ? "bg-inset"
            : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
        )}
      >
        {/* Chevron — mouse affordance; keyboard expands/collapses via Arrow keys. */}
        <button
          className="shrink-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          onClick={() => setExpanded((v) => !v)}
          tabIndex={-1}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {hasChildren ? (
            expanded ? (
              <ChevronDown className="size-3" />
            ) : (
              <ChevronRight className="size-3" />
            )
          ) : (
            <span className="inline-block size-3" />
          )}
        </button>

        {/* Selectable row: the keyboard-focusable control for this node. */}
        <button
          type="button"
          onClick={() => onSelect(node.id)}
          onKeyDown={handleKeyDown}
          aria-pressed={isSelected}
          aria-expanded={hasChildren ? expanded : undefined}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-1 rounded text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400"
        >
          {/* Tag label */}
          <span className="text-body">&lt;{node.tag}&gt;</span>

          {/* Text preview */}
          {node.text && (
            <span className="max-w-24 truncate text-zinc-400 dark:text-zinc-500">
              {node.text}
            </span>
          )}
        </button>

        {/* Delete — mouse affordance, revealed on hover or row focus; keyboard
            removes via Delete/Backspace on the row. */}
        {!isRoot && (
          <button
            className="ml-auto shrink-0 text-zinc-400 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 hover:text-red-500 dark:hover:text-red-400"
            onClick={() => onRemove(node.id)}
            tabIndex={-1}
            aria-label={`Remove ${node.tag} node`}
          >
            <X className="size-3" />
          </button>
        )}
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <ul className="border-default ml-2.5 border-l pl-4">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ─── Diff view (source vs live) ────────────────────────────────────────────────

function DiffLines({
  rows,
  side,
}: {
  rows: DiffRow[];
  side: "source" | "live";
}) {
  return (
    <div className="overflow-x-auto py-2 font-mono text-xs leading-relaxed">
      {rows.map((row, i) => {
        const text = side === "source" ? row.source : row.live;
        const isHighlighted =
          side === "source" ? row.type === "removed" : row.type === "added";
        const prefix =
          text === null
            ? ""
            : row.type === "same"
              ? "  "
              : side === "source"
                ? "- "
                : "+ ";
        return (
          <div
            key={i}
            className={cn(
              "px-4 whitespace-pre",
              isHighlighted &&
                side === "source" &&
                "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
              isHighlighted &&
                side === "live" &&
                "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
              !isHighlighted && "text-muted",
            )}
          >
            {text !== null ? `${prefix}${text}` : " "}
          </div>
        );
      })}
    </div>
  );
}

function DiffPanelHeader({ label }: { label: string }) {
  return (
    <div className="text-strong bg-header border-default border-b px-4 py-2 font-mono text-xs sm:text-sm">
      {label}
    </div>
  );
}

function DiffPanel({ rows }: { rows: DiffRow[] }) {
  return (
    <div
      className="bg-raised border-default overflow-hidden rounded-lg border"
      role="group"
      aria-label="Comparison of source HTML and live DOM"
    >
      {/* Side by side on large screens */}
      <div className="hidden divide-x divide-zinc-200 lg:grid lg:grid-cols-2 dark:divide-zinc-800">
        <div>
          <DiffPanelHeader label="Source HTML" />
          <DiffLines rows={rows} side="source" />
        </div>
        <div>
          <DiffPanelHeader label="Live DOM" />
          <DiffLines rows={rows} side="live" />
        </div>
      </div>
      {/* Stacked below large screens */}
      <div className="divide-y divide-zinc-200 lg:hidden dark:divide-zinc-800">
        <div>
          <DiffPanelHeader label="Source HTML" />
          <DiffLines rows={rows} side="source" />
        </div>
        <div>
          <DiffPanelHeader label="Live DOM" />
          <DiffLines rows={rows} side="live" />
        </div>
      </div>
    </div>
  );
}

// ─── DomDemo ──────────────────────────────────────────────────────────────────

export default function DomDemo() {
  const [tree, setTree] = useState<DomNode>(INITIAL_TREE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");
  const [newText, setNewText] = useState("");
  const nextId = useRef(7);

  const selectedNode = selectedId ? findNode(tree, selectedId) : null;
  const parentNode = selectedId ? findParent(tree, selectedId) : null;

  function handleSelect(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleRemove(id: string) {
    setTree((t) => removeNode(t, id));
    if (selectedId === id) setSelectedId(null);
  }

  function handleAddChild() {
    const tag = newTag.trim().toLowerCase();
    if (!tag || !selectedId) return;
    const text = newText.trim();
    const child: DomNode = {
      id: String(nextId.current++),
      tag,
      children: [],
      ...(text && { text }),
    };
    setTree((t) => addChild(t, selectedId, child));
    setNewTag("");
    setNewText("");
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Tree + Inspector */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Tree panel */}
        <Card className="flex-1 overflow-x-auto">
          <ul
            aria-label="Editable DOM tree"
            className="space-y-0.5 font-mono text-xs"
          >
            <TreeNode
              node={tree}
              selectedId={selectedId}
              onSelect={handleSelect}
              onRemove={handleRemove}
            />
          </ul>
        </Card>

        {/* Inspector */}
        <InspectorPanel title="Node Inspector">
          {!selectedNode ? (
            <p className="text-xs text-zinc-400 italic dark:text-zinc-500">
              Click a node to inspect it
            </p>
          ) : (
            <>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-subtle">tagName</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    &quot;{selectedNode.tag}&quot;
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-subtle">children</span>
                  <span className="text-sky-600 dark:text-sky-400">
                    {selectedNode.children.length}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-subtle">textContent</span>
                  {selectedNode.text ? (
                    <span className="max-w-28 truncate text-emerald-600 dark:text-emerald-400">
                      &quot;{selectedNode.text}&quot;
                    </span>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400">
                      null
                    </span>
                  )}
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-subtle">parentNode</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {parentNode ? `"${parentNode.tag}"` : "null"}
                  </span>
                </div>
              </div>

              <div className="border-default mt-3 space-y-2 border-t pt-3">
                <p className="text-subtle text-xs">Add child</p>
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddChild()}
                  placeholder="Tag, e.g. p, div, span"
                  aria-label="Tag name"
                  className="w-full px-2 py-1.5 text-xs"
                />
                <div className="flex gap-2">
                  <Input
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddChild()}
                    placeholder="Text (optional)"
                    aria-label="Text content"
                    className="flex-1 px-2 py-1.5 text-xs"
                  />
                  <Button
                    variant="outline"
                    onClick={handleAddChild}
                    className="px-3 py-1.5"
                    disabled={!newTag.trim()}
                  >
                    <Plus className="size-3.5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </InspectorPanel>
      </div>

      {/* Source HTML vs live DOM — makes the page's key insight visible */}
      <div className="space-y-3">
        <p className="text-subtle text-xs lg:text-sm">
          The <span className="text-body font-medium">source</span> is the HTML
          you wrote — it never changes. The{" "}
          <span className="text-body font-medium">live DOM</span> is what the
          browser renders right now. Lines only in the source are{" "}
          <span className="font-medium text-red-600 dark:text-red-400">
            red
          </span>{" "}
          — removed from the live DOM. Lines only in the live DOM are{" "}
          <span className="font-medium text-emerald-600 dark:text-emerald-400">
            green
          </span>{" "}
          — added since the source was written.
        </p>
        <DiffPanel rows={diffHtml(SOURCE_HTML, treeToHtml(tree))} />
      </div>
    </div>
  );
}
