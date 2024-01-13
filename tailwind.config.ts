import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "iclip-blue": "#157efb",
      },
    },
  },
  plugins: [],
} satisfies Config;
