import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["system-ui", "ui-sans-serif", "sans-serif"],
        body: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        rose: {
          950: "#2a0414",
        },
      },
      boxShadow: {
        "soft-card": "0 18px 45px rgba(244, 114, 182, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;

