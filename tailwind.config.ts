// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      spacing: {
        "space-xl": "64px",
        "space-lg": "32px",
        "space-base": "16px",
        "space-sm": "8px",
        "space-xs": "4px", // optional, but completes the scale
      },
    },
  },
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  plugins: [],
};
export default config;
