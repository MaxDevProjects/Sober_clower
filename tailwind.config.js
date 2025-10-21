module.exports = {
  content: ["./**/*.html"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { sm: "100%", md: "90%", lg: "72rem" },
    },
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        soft: "0 4px 14px rgba(0,0,0,0.06)",
        subtle: "0 2px 6px rgba(0,0,0,0.04)",
      },
      transitionTimingFunction: {
        'in-out-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        breathe: {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.98' },
        },
      },
      animation: {
        breathe: 'breathe 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
