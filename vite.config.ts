import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
// import viteCompression from "vite-plugin-compression";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import Sitemap from "vite-plugin-sitemap";
import { purgeCss } from "vite-plugin-tailwind-purgecss";
// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        react(),
        Sitemap({
            hostname: "https://stegg.alifeinbinary.com/",
            i18n: {
                defaultLanguage: "en",
                languages: ["en", "es", "fr"],
                strategy: "prefix",
            },
        }),
        purgeCss(),
        // viteCompression({ algorithm: "brotliCompress" }),
        visualizer({
            filename: "./dist/stats.html",
            open: true,
        }),
        ViteMinifyPlugin({}),
    ],
    base: "/",
    build: {
        assetsDir: "public",
        sourcemap: true,
        rollupOptions: {
            treeshake: "recommended",
            // output: {
            //     manualChunks: {
            //         vendor: ["react", "react-dom"],
            //     },
            // },
        },
        minify: "esbuild",
        cssCodeSplit: true,
    },
});
