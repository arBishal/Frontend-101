"use client";

import { useState, useRef } from "react";
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
  return { ...tree, children: tree.children.map((c) => addChild(c, parentId, child)) };
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

type DiffRow = { source: string | null; live: string | null; type: "same" | "added" | "removed" };

// Line-level LCS diff between the frozen source and the live DOM's generated
// HTML. Rows are aligned so both columns render the same number of lines —
// a line that exists on only one side leaves a blank placeholder on the other.
function diffHtml(before: string, after: string): DiffRow[] {
  const a = before.split("\n");
  const b = after.split("\n");
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
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

  return (
    <li role="treeitem" aria-selected={isSelected} aria-expanded={hasChildren ? expanded : undefined}>
      <div
        className={cn(
          "group flex items-center gap-1 rounded px-1.5 py-0.5 cursor-pointer select-none text-xs font-mono",
          isSelected
            ? "bg-inset"
            : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
        )}
        onClick={() => onSelect(node.id)}
      >
        {/* Chevron */}
        <button
          className="shrink-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
          tabIndex={-1}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {hasChildren
            ? expanded
              ? <ChevronDown className="size-3" />
              : <ChevronRight className="size-3" />
            : <span className="size-3 inline-block" />}
        </button>

        {/* Tag label */}
        <span className="text-body">
          &lt;{node.tag}&gt;
        </span>

        {/* Text preview */}
        {node.text && (
          <span className="text-zinc-400 dark:text-zinc-500 truncate max-w-24">
            {node.text}
          </span>
        )}

        {/* Delete button */}
        {!isRoot && (
          <button
            className="ml-auto opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-opacity shrink-0"
            onClick={(e) => { e.stopPropagation(); onRemove(node.id); }}
            aria-label={`Remove ${node.tag} node`}
          >
            <X className="size-3" />
          </button>
        )}
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <ul
          role="group"
          className="pl-4 border-l border-default ml-2.5"
        >
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

function DiffLines({ rows, side }: { rows: DiffRow[]; side: "source" | "live" }) {
  return (
    <div className="py-2 font-mono text-xs leading-relaxed overflow-x-auto">
      {rows.map((row, i) => {
        const text = side === "source" ? row.source : row.live;
        const isHighlighted = side === "source" ? row.type === "removed" : row.type === "added";
        const prefix = text === null ? "" : row.type === "same" ? "  " : side === "source" ? "- " : "+ ";
        return (
          <div
            key={i}
            className={cn(
              "px-4 whitespace-pre",
              isHighlighted && side === "source" && "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400",
              isHighlighted && side === "live" && "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
              !isHighlighted && "text-muted"
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
    <div className="px-4 py-2 font-mono text-xs sm:text-sm text-strong bg-zinc-200 dark:bg-zinc-800 border-b border-default">
      {label}
    </div>
  );
}

function DiffPanel({ rows }: { rows: DiffRow[] }) {
  return (
    <div
      className="rounded-lg bg-raised border border-default overflow-hidden"
      role="group"
      aria-label="Comparison of source HTML and live DOM"
    >
      {/* Side by side on large screens */}
      <div className="hidden lg:grid lg:grid-cols-2 divide-x divide-zinc-200 dark:divide-zinc-800">
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
      <div className="lg:hidden divide-y divide-zinc-200 dark:divide-zinc-800">
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
    const child: DomNode = { id: String(nextId.current++), tag, children: [], ...(text && { text }) };
    setTree((t) => addChild(t, selectedId, child));
    setNewTag("");
    setNewText("");
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Tree + Inspector */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Tree panel */}
        <Card className="flex-1 overflow-x-auto">
          <ul role="tree" className="text-xs font-mono space-y-0.5">
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
            <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
              Click a node to inspect it
            </p>
          ) : (
            <>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-subtle">tagName</span>
                  <span className="text-emerald-600 dark:text-emerald-400">&quot;{selectedNode.tag}&quot;</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-subtle">children</span>
                  <span className="text-sky-600 dark:text-sky-400">{selectedNode.children.length}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-subtle">textContent</span>
                  {selectedNode.text
                    ? <span className="text-emerald-600 dark:text-emerald-400 truncate max-w-28">&quot;{selectedNode.text}&quot;</span>
                    : <span className="text-amber-600 dark:text-amber-400">null</span>
                  }
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-subtle">parentNode</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {parentNode ? `"${parentNode.tag}"` : "null"}
                  </span>
                </div>
              </div>

              <div className="border-t border-default pt-3 mt-3 space-y-2">
                <p className="text-xs text-subtle">Add child</p>
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddChild()}
                  placeholder="Tag, e.g. p, div, span"
                  aria-label="Tag name"
                  className="w-full text-xs py-1.5 px-2"
                />
                <div className="flex gap-2">
                  <Input
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddChild()}
                    placeholder="Text (optional)"
                    aria-label="Text content"
                    className="flex-1 text-xs py-1.5 px-2"
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
        <p className="text-xs lg:text-sm text-subtle">
          The{" "}
          <span className="font-medium text-body">source</span>{" "}
          is the HTML you wrote — it never changes. The{" "}
          <span className="font-medium text-body">live DOM</span>{" "}
          is what the browser renders right now. Lines only in the source are{" "}
          <span className="text-red-600 dark:text-red-400 font-medium">red</span>{" "}
          — removed from the live DOM. Lines only in the live DOM are{" "}
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">green</span>{" "}
          — added since the source was written.
        </p>
        <DiffPanel rows={diffHtml(SOURCE_HTML, treeToHtml(tree))} />
      </div>
    </div>
  );
}
