import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import Sitemap from "vite-plugin-sitemap";
import { purgeCss } from "vite-plugin-tailwind-purgecss";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        Sitemap({
            hostname: "https://feed.alifeinbinary.com",
            i18n: {
                defaultLanguage: "en",
                languages: ["en", "es", "fr"],
                strategy: "prefix",
            },
        }),
        purgeCss(),
    ],
    base: "/",
    build: {
        assetsDir: "public",
        sourcemap: true,
        rollupOptions: {
            treeshake: "recommended",
        },
    },
});
