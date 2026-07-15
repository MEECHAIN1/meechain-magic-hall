import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://ritual-chain--pouaun2499.replit.app',
        changeOrigin: true,
        secure: true
      },
      '/health': {
        target: 'https://ritual-chain--pouaun2499.replit.app',
        changeOrigin: true,
        secure: true
      }
    }
  }
});
