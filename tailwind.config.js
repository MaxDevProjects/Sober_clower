module.exports = {
  content: ["./**/*.html"],
  theme: {
    container: { center: true, padding: "1rem", screens: { lg: "72rem" } },
    extend: {
      colors: {
        clower: {
          violet: "#9C6BFF",
          dark: "#1E1E1E",
          light: "#F8F8FF",
          green: "#A3E3C2",
          gray: "#E5E5E5",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 14px rgba(0,0,0,0.06)",
        subtle: "0 2px 6px rgba(0,0,0,0.04)",
      },
      keyframes: {
        breathe: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
      animation: { breathe: "breathe 6s ease-in-out infinite" },
    },
  },
  plugins: [],
};
