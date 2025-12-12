/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral9: "var(--neutral-900)",
    neutral6: "var(--neutral-600)",
    neutral3: "var(--neutral-300)",
    neutral2: "var(--neutral-200)",
    neutral0: "var(--neutral-0)",
    blue7: "var(--blue-700)",
    blue6: "var(--blue-600)",
    blue2: "var(--blue-200)",
    blue1: "var(--blue-100)",
    red7: "var(--red-700)",
    red3: "var(--red-300)",
    indigo2: "var(--indigo-200)",
    blue3: "var(--blue-300)",
    green3: "var(--green-300)",
    amber3: "var(--amber-300)"
      },
    },
  },
  plugins: [],
}