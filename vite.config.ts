import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import Sitemap from "vite-plugin-sitemap";

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
        ViteMinifyPlugin({}),
    ],
    build: {
        assetsDir: "public",
        sourcemap: true,
        rollupOptions: {
            treeshake: true,
            // output: {
            //     manualChunks: {
            //         vendor: ["react", "react-dom"],
            //     },
            // },
        },
        minify: "oxc",
        cssCodeSplit: true,
    },
    base: "/",
});
