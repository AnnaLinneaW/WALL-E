import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/AnnaLinneaW/',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
});
