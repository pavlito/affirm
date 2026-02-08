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
  onSuccess: async () => {
    copyFileSync('src/styles.css', 'dist/styles.css');
  },
});
