/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "notice-banner": "url('assets/images/notice-banner.png')",
        "content-banner": "url('assets/images/content-banner.png')",
        "livinglab-banner": "url('assets/images/living-lab-banner.png')",
        "campaign-banner": "url('assets/images/campagin-banner.png')",
      },
      colors: {
        gradientText: "bg-gradient-to-r from-[#0066C1] to-[#009FE5] text-transparent bg-clip-text",
        transparent: "transparent",
        current: "currentColor",
        white: "#FFFFFF",
        black: "#000000",
        grey: {
          darkest: "#283E51",
          darker: "#303030",
          dark: "#3B4650",
          DEFAULT: "#606A74",
          light: "#727272",
          lighter: "#999999",
          lightest: { DEFAULT: "#F1F1F1", 70: "#F6F6F6" },
          border: { DEFAULT: "#CCCCCC", dark: "#C0C0C0" },
        },
        primary: {
          dark: "#155CA2",
          DEFAULT: "#0066C1",
          light: "#0075DC",
          lighter: "#D4E9FC",
          lightest: "#C4F7FF",
        },
        secondary: "#008E84",
      },
      spacing: {
        padding: "var(--padding)",
      },
      fontFamily: {
        notosans: ["Noto Sans KR", "sans-serif"],
      },
      listStyleType: {
        none: "none",
        disc: "disc",
        decimal: "decimal",
        square: "square",
        roman: "upper-roman",
      },
    },
    screens: {
      xs: "425px",
      ...defaultTheme.screens,
    },
  },
  plugins: [
    // ...
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar'),
],
};
