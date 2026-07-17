"use client";

import { useState, useRef } from "react";
import { ChevronRight, ChevronDown, X, Plus } from "lucide-react";
import Card from "@/app/components/ui/Card";
import InspectorPanel from "@/app/components/ui/InspectorPanel";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import CodeBlock from "@/app/components/ui/CodeBlock";
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
  if (node.text && node.children.length === 0) {
    return `${pad}<${node.tag}>${node.text}</${node.tag}>`;
  }
  if (node.children.length === 0) {
    return `${pad}<${node.tag}></${node.tag}>`;
  }
  const inner = node.children.map((c) => treeToHtml(c, indent + 1)).join("\n");
  return `${pad}<${node.tag}>\n${inner}\n${pad}</${node.tag}>`;
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
            ? "bg-zinc-100 dark:bg-zinc-800"
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
        <span className="text-zinc-700 dark:text-zinc-300">
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
          className="pl-4 border-l border-zinc-200 dark:border-zinc-800 ml-2.5"
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

// ─── DomDemo ──────────────────────────────────────────────────────────────────

export default function DomDemo() {
  const [tree, setTree] = useState<DomNode>(INITIAL_TREE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");
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
    const child: DomNode = { id: String(nextId.current++), tag, children: [] };
    setTree((t) => addChild(t, selectedId, child));
    setNewTag("");
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
                  <span className="text-zinc-500 dark:text-zinc-400">tagName</span>
                  <span className="text-emerald-600 dark:text-emerald-400">&quot;{selectedNode.tag}&quot;</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500 dark:text-zinc-400">children</span>
                  <span className="text-sky-600 dark:text-sky-400">{selectedNode.children.length}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500 dark:text-zinc-400">textContent</span>
                  {selectedNode.text
                    ? <span className="text-emerald-600 dark:text-emerald-400 truncate max-w-28">&quot;{selectedNode.text}&quot;</span>
                    : <span className="text-amber-600 dark:text-amber-400">null</span>
                  }
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-zinc-500 dark:text-zinc-400">parentNode</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {parentNode ? `"${parentNode.tag}"` : "null"}
                  </span>
                </div>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 mt-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Add child</p>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddChild()}
                    placeholder="e.g. p, div, span"
                    aria-label="Tag name"
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

      {/* Generated HTML */}
      <CodeBlock
        title="Generated HTML"
        lang="html"
        code={treeToHtml(tree)}
      />
    </div>
  );
}
