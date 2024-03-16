module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Museo: ["Museo", "sans-serif"],
        Satoshi: ["Satoshi", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        customBlack: {
          100: "#010101",
          200: "#2B2B2B",
          300: "#424242",
          400: "#555555",
          500: "#35383F",
          600: "#1F1F1F",
          700: "#424242",
          800: "#0F1011",
          900: "#556777",
        },
        customGray: {
          100: "#808080",
          200: "#CBD5E1",
          300: "#FAFAFA",
          400: "rgba(0, 0, 0, 0.33)",
          500: "DBE0E1",
          600: "#D5D5D5",
        },
        customGreen: {
          100: "#007464",
        },
        customYellow: {
          100: "#FFFAE9",
          200: "rgba(215, 181, 53, 0.2)",
          300: "#F7F0D7",
        },
        customSlate: {
          100: "#D4D4D4",
        },
        customBlue: {
          100: "#0AA4DB",
          200: "#091E42",
        },
        customPink: {
          100: "#F9E5E4",
        },
        customRed: {
          100: "#FF2414",
        },
      },
      screens: {
        "3xl": "1700px",
      },
    },
  },
  plugins: [],
};
