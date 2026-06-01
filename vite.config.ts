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
    tanstackStart({
      server: { entry: "server" }, // points to src/server.ts
    }),
    nitro({ preset: "vercel" }),
    viteReact(),
  ],
});
