import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const processEnvValues = { ...process.env, ...loadEnv(mode, '../../') };

  return {
    plugins: [svelte({ configFile: './renderer/svelte.config.js' })],
    root: '../',
    publicDir: '../public',
    base: '',
    build: {
      outDir: '../build/',
      assetsDir: './assets/',
      emptyOutDir: true,
    },
    server: {
      port: parseInt(processEnvValues.VITE_PORT),
    },
  };
});
