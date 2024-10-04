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
                hostname: "https://stegg.alifeinbinary.com",
                i18n: {
                    defaultLanguage: "en",
                    languages: ["en", "es", "fr"],
                    strategy: "prefix",
                },
            }),
            purgeCss(),
        ],
        base:
            mode === "production"
                ? "https://stegg.alifeinbinary.com/"
                : "http://localhost:5173/",
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
