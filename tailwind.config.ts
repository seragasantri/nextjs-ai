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
        contentColor: "#212121",
        sidebarColor: "#171717",
        inputColor:"#303030"
      },
    },
  },
  plugins: [],
} satisfies Config;
