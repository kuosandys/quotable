import { builtinModules } from 'node:module';
import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
  root: __dirname,
  envDir: process.cwd(),

  build: {
    sourcemap: 'inline',
    outDir: '../../build/app',
    emptyOutDir: true,
    target: 'node16',

    // build in lib mode
    lib: {
      entry: [
        path.resolve(__dirname, './index.ts'),
        path.resolve(__dirname, './preload/preload.ts'),
      ],
      formats: ['cjs'],
    },

    rollupOptions: {
      external: [
        'electron',
        'better-sqlite3',
        'knex',
        ...builtinModules.flatMap((p) => [p, `node:${p}`]),
      ],

      output: {
        entryFileNames: '[name].cjs',
      },
    },
  },
});
