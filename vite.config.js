import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Configuration for building the project
  build: {
    outDir: 'dist', // Ensure the output directory matches what Vercel expects
    rollupOptions: {
      input: 'index.html', // Specify the entry point
    },
  },
  // Proxy settings for local development
  server: {
    proxy: {
      '/api': 'https://blogverseaj.vercel.app',
    },
  },
  plugins: [react()],
  // Set the base for assets
  base: '/', // Ensure this is set for proper asset loading
});
