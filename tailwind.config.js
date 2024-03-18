/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/*.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      gridTemplateColumns: {
        aspects: "repeat(auto-fill, minmax(60px, 1fr))",
        canvas: "repeat(auto-fill, minmax(120px, 1fr))",
      },
      gridTemplateRows: {
        aspects: "repeat(auto-fill, minmax(80px, 1fr))",
        canvas: "repeat(auto-fill, minmax(60px, 1fr))",
      },
    },
  },
  plugins: [],
};
