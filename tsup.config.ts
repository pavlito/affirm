import { defineConfig } from 'tsup';
import { copyFileSync } from 'fs';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  sourcemap: true,
  minify: true,
  banner: {
    js: '"use client";',
  },
  onSuccess: async () => {
    copyFileSync('src/styles.css', 'dist/styles.css');
  },
});
