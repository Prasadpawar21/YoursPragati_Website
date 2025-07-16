// tailwind.config.js (ES module syntax for Vite projects)
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oxygen: ['"Oxygen"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
