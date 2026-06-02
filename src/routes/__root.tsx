import type { ReactNode } from "react";
import {
  createRootRoute,
  ErrorComponentProps,
  HeadContent,
  Link,
  NotFoundRouteProps,
  Outlet,
  Scripts,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import "../styles.css";
import { reportLovableError } from "../lib/lovable-error-reporting";

function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    reportLovableError(error, { boundary: "root" });
  }, [error]);

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#fafafa",
        color: "#111",
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        margin: 0,
        padding: "1.5rem",
      }}
    >
      <div style={{ maxWidth: "28rem", width: "100%", textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>Something went wrong</h1>
        <p style={{ color: "#4b5563", margin: "0 0 1.5rem" }}>
          An unexpected error occurred. You can try again or head back home.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              cursor: "pointer",
              border: "1px solid transparent",
              background: "#111",
              color: "#fff",
              font: "inherit",
            }}
          >
            Try again
          </button>
          <Link
            to="/"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              cursor: "pointer",
              border: "1px solid #d1d5db",
              background: "#fff",
              color: "#111",
              font: "inherit",
              textDecoration: "none",
            }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFoundComponent(_props: NotFoundRouteProps) {
  const router = useRouter();

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#fafafa",
        color: "#111",
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        margin: 0,
        padding: "1.5rem",
      }}
    >
      <div style={{ maxWidth: "28rem", width: "100%", textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>Page not found</h1>
        <p style={{ color: "#4b5563", margin: "0 0 1.5rem" }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => router.history.back()}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              cursor: "pointer",
              border: "1px solid #d1d5db",
              background: "#fff",
              color: "#111",
              font: "inherit",
            }}
          >
            Go back
          </button>
          <Link
            to="/"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              cursor: "pointer",
              border: "1px solid transparent",
              background: "#111",
              color: "#fff",
              font: "inherit",
              textDecoration: "none",
            }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
  }),
  errorComponent: RootErrorComponent,
  notFoundComponent: NotFoundComponent,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
