/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/*.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      gridTemplateColumns: {
        aspects: "repeat(auto-fill, minmax(100px, calc(50% - 2rem)))",
        canvas: "repeat(auto-fill, minmax(100px, 1fr))",
      },
    },
  },
  plugins: [],
};
