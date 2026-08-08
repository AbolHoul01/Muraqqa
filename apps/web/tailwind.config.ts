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
        "muraqqa-navy": "#1A2B4C",
        "muraqqa-teal": "#14B8A6",
        "muraqqa-paper": "#FAF9F6",
        "muraqqa-slate": "#64748B",
      },
    },
  },
  plugins: [],
};

export default config;
