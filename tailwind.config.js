/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#10b981",
        dark: "#0f172a",
        darker: "#0a0f1f",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.4)",
        "glow-lg": "0 0 30px rgba(99, 102, 241, 0.6)",
      },
      keyframes: {
        auraPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(99, 102, 241, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(99, 102, 241, 0.6), 0 0 60px rgba(99, 102, 241, 0.3)",
          },
        },
      },
      animation: {
        auraPulse: "auraPulse 3s infinite",
      },
    },
  },
  plugins: [],
};
