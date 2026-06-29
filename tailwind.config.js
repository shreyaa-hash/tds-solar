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
        secondary: "var(--accent-primary)",  // Accent Blue (#00C8FF)
        accent: "var(--accent-hover)",       // Neon Blue/Cyan
        gold: "var(--accent-gold)",          // Solar Gold (#FDB813)
        background: "var(--bg-primary)",     // Deep Space Blue (#071A2D)
        lightbg: "var(--bg-secondary)",      // Secondary Blue (#0B2C45)
        frosted: "var(--bg-card)",           // Glass (rgba(255,255,255,0.08))
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
