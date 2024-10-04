import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import Sitemap from "vite-plugin-sitemap";
import { purgeCss } from "vite-plugin-tailwind-purgecss";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            react(),
            Sitemap({
                hostname: "stegg.alifeinbinary.com",
                i18n: {
                    defaultLanguage: "en",
                    languages: ["en", "es", "fr"],
                    strategy: "prefix",
                },
            }),
            purgeCss(),
        ],
        base: mode === "production" ? "stegg.alifeinbinary.com/" : "/",
        build: {
            assetsDir: "public",
            sourcemap: true,
            rollupOptions: {
                treeshake: "recommended",
            },
            minify: "esbuild",
        },
    };
});
