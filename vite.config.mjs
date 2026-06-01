import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [
    viteTsConfigPaths(),
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    nitro({ preset: "vercel", prerender: { enabled: false } }),
    viteReact(),
  ],
  build: {
    rollupOptions: {
      external: [
        "node:async_hooks", "node:stream", "node:util", "node:events",
        "node:buffer", "node:path", "node:fs", "node:url", "node:crypto",
        "node:querystring", "node:zlib", "node:http", "node:net",
        "node:tls", "node:os", "node:dns", "node:dgram", "node:cluster",
        "node:module", "node:vm", "node:child_process", "node:worker_threads",
        "node:perf_hooks", "node:diagnostics_channel",
      ],
    },
  },
  ssr: {
    noExternal: ["@tanstack/react-query", "@tanstack/react-router"],
  },
});
