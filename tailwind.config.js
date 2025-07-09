/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // garante que o Tailwind funcione em todos os arquivos React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
