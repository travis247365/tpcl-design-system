import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Docs app: rebuilds every Claude Design page from the library components.
export default defineConfig({
  root: 'docs',
  base: './',
  plugins: [react()],
  build: { outDir: '../docs-dist', emptyOutDir: true },
  server: { port: 5173 },
  preview: { port: 4173 },
});
