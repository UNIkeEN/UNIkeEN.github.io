const THEME_STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function getCurrentTheme(): Theme {
  const explicitTheme = document.documentElement.dataset.theme;

  if (explicitTheme === "light" || explicitTheme === "dark") {
    return explicitTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const toggleTheme = () => {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The selected theme still applies for this page if storage is blocked.
    }
  };

  return (
    <button
      aria-label="Toggle color theme"
      className="theme-toggle"
      onClick={toggleTheme}
      title="Toggle color theme"
      type="button"
    >
      <svg
        aria-hidden="true"
        className="theme-toggle__icon theme-toggle__sun"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </svg>
      <svg
        aria-hidden="true"
        className="theme-toggle__icon theme-toggle__moon"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z" />
      </svg>
    </button>
  );
}
