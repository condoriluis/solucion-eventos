import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://solucion-eventos.vercel.app',
    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
    ],
    output: 'static',
    server: {
        host: true,
        port: 4321,
    },
    vite: {
        ssr: {
            noExternal: ['@radix-ui/*', 'framer-motion'],
        },
    },
});
