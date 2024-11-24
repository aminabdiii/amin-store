/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      screens: {
        xs: "500px",
        850: "850px",
        vxs: "400px",
        xxs: "340px",
        450: "450px",
        360: "360px",
      },
      maxWidth: {
        "8xl": "1500px",
      },
      height: {
        screen: "100dvh",
      },
      colors: {
        "violet-500": "#663dff",
      },
    },
  },
  plugins: [],
};
