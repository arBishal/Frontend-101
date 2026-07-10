export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
        <p>
          <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">
            frontend-101
          </span>
          {" "}&mdash; a learning resource for new frontend devs.
        </p>
        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} &middot; MIT License</span>
          <a
            href="https://github.com/arBishal/Frontend-101/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Found an issue?
          </a>
        </div>
      </div>
    </footer>
  );
}
