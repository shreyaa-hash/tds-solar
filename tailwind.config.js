/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--text-primary)",      // White (#FFFFFF)
        secondary: "var(--accent-primary)",  // Electric Tech Blue (#00AEEF)
        accent: "var(--accent-hover)",       // Neon Sky Blue (#38BDF8)
        background: "var(--bg-primary)",     // Darkest Obsidian (#030712)
        lightbg: "var(--bg-secondary)",      // Slate Space Blue (#080D1A)
        frosted: "var(--bg-card)",           // Translucent Glass (rgba(13,21,39,0.45))
        silver: "var(--text-secondary)",     // Cool Light Grey (#CBD5E1)
        coolgray: "var(--text-muted)",        // Muted Slate Grey (#64748B)
        darkslate: "var(--text-secondary)",   // Cool Light Grey (for compatibility)
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      }
    },
  },
  plugins: [],
}
