/* eslint-disable no-undef */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', "cursive"],
      },
      zIndex: {
        header: "50", // Custom z-index value for the header
        map: "10", // Custom z-index value for the map
      },
    },
  },
  plugins: [],
};
