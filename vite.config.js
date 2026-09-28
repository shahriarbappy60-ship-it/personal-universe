import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/ // deployment sync
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
