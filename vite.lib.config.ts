import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Library build: dist/index.js and dist/email.js (server-side email renderer).
// The stylesheet is assembled by scripts/build-css.mjs so fonts and logos ship
// as files instead of being inlined as base64.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: { index: resolve(import.meta.dirname, 'src/index.ts'), email: resolve(import.meta.dirname, 'src/email.tsx') },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
    },
  },
});
