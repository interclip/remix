import type { Config } from "tailwindcss";
import TailwindAnimate from "tailwindcss-animate";

export default {
    content: ["./app/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "iclip-blue": "#157efb",
            },
        },
    },
    plugins: [TailwindAnimate],
} satisfies Config;
