import { Links, Meta, Outlet, Scripts } from "react-router";

import "./styles/global.css";

import { ThemeToggle } from "./components/theme-toggle";

const restoreThemeScript = `
try {
  const theme = window.localStorage.getItem("theme");
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  }
} catch {}
`;

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="preload"
          href="/fonts/poppins-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/poppins-latin-600-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: restoreThemeScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ThemeToggle />
        <Scripts />
      </body>
    </html>
  );
}
