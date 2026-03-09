// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://kurage-astro.vercel.app',
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    markdoc(),
    keystatic(),
  ],
  server: {
    allowedHosts: ['kurage-astro.vercel.app'],
  },
  build: {
    format: 'directory',
  },
});
