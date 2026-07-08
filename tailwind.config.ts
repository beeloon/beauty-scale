import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        gold: "var(--gold)",
        line: "var(--line)",
        tier: {
          1: "#F2D6CE",
          2: "#F0C39C",
          3: "#E4A6AE",
          4: "#C98BA9",
          5: "#9B5C7E",
          6: "#7C3F5F",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
      },
      letterSpacing: {
        caps: "0.18em",
      },
    },
  },
  plugins: [],
} satisfies Config;
