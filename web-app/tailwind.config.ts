import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-background": "var(--main-background)",
        "second-background": "var(--second-background)",
        "main-btn": "var(--main-btn)",
        "second-btn": "var(--second-btn)",
        "main-paragraph-text": "var(--main-paragraph-text)",
        "second-paragraph-text": "var(--second-paragraph-text)",
        "white-text": "var(--white-text)",
        "black-text": "var(--black-text)",
        "navigation-text": "var(--navigation-text)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
