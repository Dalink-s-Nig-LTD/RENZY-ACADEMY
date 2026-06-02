import { defineConfig } from "vitest/config";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [viteTsConfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: [
        "src/lib/**",
        "src/hooks/**",
        "src/components/ui/button.tsx",
        "src/components/ui/input.tsx",
        "src/components/ui/card.tsx",
        "src/components/ui/badge.tsx",
        "src/components/ui/label.tsx",
        "src/components/ui/textarea.tsx",
        "src/components/ui/skeleton.tsx",
        "src/components/ui/alert.tsx",
        "src/components/ui/separator.tsx",
        "src/components/ui/progress.tsx",
        "src/components/ui/switch.tsx",
        "src/components/ui/checkbox.tsx",
        "src/components/ui/tabs.tsx",
        "src/components/ui/toggle.tsx",
        "src/components/ui/tooltip.tsx",
        "src/components/ui/accordion.tsx",
        "src/components/ui/dialog.tsx",
        "src/components/ui/avatar.tsx",
        "src/components/ui/select.tsx",
        "src/components/ui/table.tsx",
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
});
