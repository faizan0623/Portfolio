/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F1613",
          panel: "#161F1B",
          line: "#2A3733",
        },
        paper: "#EDEFE7",
        muted: "#8FA396",
        flavin: {
          DEFAULT: "#E8C547",
          dim: "#B89A34",
        },
        chlorophyll: {
          DEFAULT: "#4C8B5C",
          bright: "#6BAE7A",
        },
        spectral: "#7FD8C5",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
