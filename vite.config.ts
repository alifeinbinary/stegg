import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
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
        ViteMinifyPlugin({}),
    ],
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
    base: "/#/",
});
