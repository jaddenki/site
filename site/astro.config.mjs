// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jadden.xyz',
  integrations: [react(), tailwind(), mdx(), sitemap()],
  output: 'static',
  
  // Performance optimizations
  compressHTML: true,
  
  prefetch: {
    // Prefetch links on hover for faster navigation
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  
  build: {
    // Inline small assets to reduce HTTP requests
    inlineStylesheets: 'auto',
  },
  
  vite: {
    build: {
      // Disable CSS code splitting to combine CSS files into one
      cssCodeSplit: false,
      // Minify output
      minify: 'esbuild',
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 500,
    },
  },
});
