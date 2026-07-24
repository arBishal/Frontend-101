"use client";

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  resolvedTheme: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

// Module-level set so setTheme can notify useSyncExternalStore within the same tab.
// (The native `storage` event only fires in other tabs, not the originating tab.)
const themeListeners = new Set<() => void>();

function subscribeToTheme(callback: () => void): () => void {
  themeListeners.add(callback);
  return () => {
    themeListeners.delete(callback);
  };
}

function getThemeSnapshot(): ResolvedTheme {
  const stored = localStorage.getItem("theme");
  if (stored === "dark") return "dark";
  if (stored === "light") return "light";
  return "dark";
}

function getThemeServerSnapshot(): ResolvedTheme {
  return "dark";
}

function applyTheme(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const resolvedTheme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  // Sync the DOM class whenever the resolved theme changes.
  // This is a DOM side-effect, not a setState call, so no cascading render.
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem("theme", next);
    // Notify subscribers in this tab so useSyncExternalStore re-reads the snapshot.
    themeListeners.forEach((cb) => cb());
  }, []);

  return (
    <ThemeContext.Provider value={{ resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
