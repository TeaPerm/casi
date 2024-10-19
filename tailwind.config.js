/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
