"use client";

import { useState, useCallback } from "react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import CodeBlock from "@/app/components/ui/CodeBlock";
import Card from "@/app/components/ui/Card";
import { Plus, X, Check } from "lucide-react";
import { cn } from "@/app/lib/cn";


const vanillaCode = `<script>
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");

let nextId = 0;

function updateCounter() {
  const total = list.children.length;
  const done = list.querySelectorAll(".completed").length;
  counter.textContent = done + "/" + total + " completed";
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const id = nextId++;
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = id;

  // Toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "○";
  toggleBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    const span = li.querySelector("span");
    if (li.classList.contains("completed")) {
      toggleBtn.textContent = "✓";
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.5";
    } else {
      toggleBtn.textContent = "○";
      span.style.textDecoration = "";
      span.style.opacity = "";
    }
    updateCounter();
  });

  // Text
  const span = document.createElement("span");
  span.textContent = text;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.addEventListener("click", () => {
    list.removeChild(li);
    updateCounter();
  });

  li.appendChild(toggleBtn);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);

  input.value = "";
  updateCounter();
});
</script>

<!-- HTML markup -->
<div id="todo-app">
  <div>
    <input id="todo-input" type="text" placeholder="Add a todo..." />
    <button id="add-btn">Add</button>
  </div>
  <p id="counter"></p>
  <ul id="todo-list"></ul>
</div>`;

const reactCode = `function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  function addTodo() {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  }

  function toggle(id) {
    setTodos(todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function remove(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const done = todos.filter((t) => t.done).length;

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <p>{done}/{todos.length} completed</p>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <button onClick={() => toggle(t.id)}>
              {t.done ? "✓" : "○"}
            </button>
            <span style={{ opacity: t.done ? 0.5 : 1 }}>
              {t.text}
            </span>
            <button onClick={() => remove(t.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

type Todo = { id: string; text: string; done: boolean };

export default function FrameworkDemo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = useCallback(() => {
    if (!text.trim()) return;
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: text.trim(), done: false }]);
    setText("");
  }, [text]);

  const toggle = useCallback((id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const remove = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Live demo */}
      <Card className="space-y-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm md:text-base uppercase tracking-wide text-zinc-400 dark:text-zinc-300">
            What To Do?
          </p>
          {todos.length > 0 && (
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {doneCount}/{todos.length} completed
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a todo..."
            className="flex-1"
          />
          <Button onClick={addTodo} className="px-4 py-2">
            <Plus className="size-4" />
            Add a task
          </Button>
        </div>
        {todos.length > 0 ? (
          <ul className="space-y-1.5">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2.5 text-sm"
              >
                <button
                  onClick={() => toggle(todo.id)}
                  className="shrink-0 transition-colors"
                >
                  {todo.done ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <span className="block size-4 rounded-full border border-zinc-300 dark:border-zinc-600" />
                  )}
                </button>
                <span
                  className={cn(
                    "flex-1",
                    todo.done ? "line-through text-zinc-400 dark:text-zinc-600" : "text-zinc-700 dark:text-zinc-300"
                  )}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => remove(todo.id)}
                  className="shrink-0 text-zinc-400 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">
            No todos yet. Type something and press Enter or click Add.
          </p>
        )}
      </Card>

      {/* Code — side by side on md+, tabbed below md */}
      <div className="hidden lg:grid lg:grid-cols-2">
        <CodeBlock code={vanillaCode} lang="html" title="Vanilla JS" className="rounded-r-none border-r-0" />
        <CodeBlock code={reactCode} lang="jsx" title="React" className="rounded-l-none" />
      </div>
      <div className="lg:hidden">
        <CodeBlock
          tabs={[
            { label: "Vanilla JS", code: vanillaCode, lang: "html" },
            { label: "React", code: reactCode, lang: "jsx" },
          ]}
        />
      </div>

      {/* Callout */}
      <Card className="bg-zinc-50 dark:bg-zinc-800/50 px-5 py-4 sm:px-5 sm:py-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Both do the same thing. The framework version is shorter, declarative,
          and automatically keeps the UI in sync with the data.
        </p>
      </Card>
    </div>
  );
}
