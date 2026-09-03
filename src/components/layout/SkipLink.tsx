export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:px-3 focus:py-2"
    >
      Skip to main content
    </a>
  );
}
