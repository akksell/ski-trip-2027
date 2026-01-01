// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  redirects: {
      "/": "/2027",
  },

  vite: {
    plugins: [
        tailwindcss(),
        svgr({
            include: '**/*.svg?react',
            svgrOptions: {
                plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
                svgoConfig: {
                    plugins: [
                        'preset-default',
                        'removeTitle',
                        'removeDesc',
                        'removeDoctype',
                        'cleanupIds'
                    ],
                },
            },
        }),
    ],
  },

  integrations: [react()],
});
