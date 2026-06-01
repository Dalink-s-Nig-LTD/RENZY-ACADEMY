import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "renzy-primary": "#002B5C",
        "renzy-accent": "#E31B23",
        "renzy-light": "#F5F5F5",
      },
    },
  },
  plugins: [],
} satisfies Config;
