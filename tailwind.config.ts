import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class" as const,
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./page-components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
export default config;
