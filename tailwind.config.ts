import type { Config } from "tailwindcss";

// "Iron & Oxblood" — warm near-black base, oxblood accent, cool steel secondary.
// All neutrals tinted warm (toward the base hue); never pure #000/#fff.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm charcoal base ramp
        iron: {
          950: "#0b0a09", // page background
          900: "#111010",
          850: "#161413",
          800: "#1c1918",
          700: "#272322",
          600: "#3a3532",
          500: "#4e4844",
        },
        // Warm bone / off-white text ramp
        bone: {
          50: "#f4efe8",
          100: "#e9e4dc",
          200: "#d6cfc4",
          300: "#b8afa2",
          400: "#948b7e",
          500: "#6f665c",
        },
        // Oxblood — dried blood, desaturated. The single hot accent.
        oxblood: {
          300: "#c8564c",
          400: "#b23c33",
          500: "#9a2c25", // primary accent
          600: "#7c1f1a",
          700: "#5e1713",
        },
        // Cool brushed steel — deliberate temperature tension vs warm base.
        steel: {
          300: "#c3c8cc",
          400: "#9aa1a7",
          500: "#7b838a",
          600: "#5c646b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
