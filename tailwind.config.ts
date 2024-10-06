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
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: '#9C27B0',
        pink: '#F6B0C8',
        green1: '#385E1A',
        green2: '#294426',
        green3: '#234F1E',
        darkbrown: '#432616',
        brown: '#5A3925',
        lightbrown: '#795548',
        beetroot: '#682A2A',
        darkred: '#900D09',
        red: '#A91B0D',
        gray: '#635959',
        blue: '#3C4D73',
        gold: '#B8860B',
      },
      fontFamily: {
        brookshire: ["var(--font-brookshire)"],
      }
    },
  },
  plugins: [],
};
export default config;
