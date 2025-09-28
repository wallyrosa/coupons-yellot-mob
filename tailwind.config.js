import { themeConfig } from "./src/theme";
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    ...themeConfig,
  },
  plugins: [require("tailwindcss-animate")],
};
