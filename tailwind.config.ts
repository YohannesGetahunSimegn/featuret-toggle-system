import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        snowfall: "snowfall 5s linear infinite",
      },
      keyframes: {
        snowfall: {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-30px, 50vh)" },
          "100%": { transform: "translate(30px, 100vh)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
