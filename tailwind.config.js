/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
    theme: {
        extend: {
            colors: {
                // Tailwind colors
                // * denotes not a close match
                beige: "#ffeedd", // orange-100
                lightergreen: "#ddeecc", // lime-100
                eggblue: "#aaddcc", // emerald-200
                seablue: "#99aabb", // slate-400
                sagegreen: "#88aa99", // neutral-400 *
                lightgreen: "#aabb99", // stone-400 *
                lighterbrown: "#bb9988", // stone-400 *
                lightorange: "#eebbaa", // red-300 *
                orange: "#ff8866", // red-400 *
                pink: "#ccaabb", // stone-400 *
                mauve: "#886677", // stone-500 *
                lightbrown: "#887766", // stone-500 *
                brown: "#554433", // stone-700
                greengrass: "#667755", // stone-500 *
                quailegg: "#557777", // gray-500 *
                forestgreen: "#223311", // lime-950
                lightbergundy: "#442233", // zinc-800 *
                bergundy: "#331111", // orange-950
                deepbergundy: "#330011", // red-950
            },
            transitionProperty: {
                width: "width",
            },
        },
        screens: {
            xs: { max: "639px" },
        },
    },
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    plugins: [flowbite.plugin(), "eslint-plugin-tailwindcss"],
};
