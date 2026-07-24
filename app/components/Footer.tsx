export default function Footer() {
  return (
    <footer className="border-default border-t px-6 py-6 lg:px-8">
      <div className="text-muted flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
        <p>
          <span className="text-body font-mono font-medium">frontend-101</span>{" "}
          &mdash; a learning resource for new frontend devs.
        </p>
        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} &middot; MIT License</span>
          <a
            href="https://github.com/arBishal/Frontend-101/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-body transition-colors"
          >
            Found an issue?
          </a>
        </div>
      </div>
    </footer>
  );
}
