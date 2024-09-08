/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#ffeedd",
        lightergreen: "#ddeecc",
        eggblue: "#aaddcc",
        seablue: "#99aabb",
        sagegreen: "#88aa99",
        lightgreen: "#aabb99",
        lighterbrown: "#bb9988",
        lightorange: "#eebbaa",
        orange: "#ff8866",
        pink: "#ccaabb",
        mauve: "#886677",
        lightbrown: "#887766",
        brown: "#554433",
        greengrass: "#667755",
        quailegg: "#557777",
        forestgreen: "#223311",
        lightbergundy: "#442233",
        bergundy: "#331111",
        deepbergundy: "#330011",
      },
    },
    screens: {
      xs: { max: "639px" },
    },
  },
  plugins: [require("flowbite/plugin")],
};
