import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ configFile: './renderer/svelte.config.js' })],
  root: '../',
  publicDir: '../public',
  base: '',
  build: {
    outDir: '../build/',
    assetsDir: './assets/',
    emptyOutDir: true,
  },
});
