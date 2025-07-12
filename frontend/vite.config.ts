import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      "frontend-600142599851.europe-west1.run.app",
      "darassa.academy"
    ],
    host: '0.0.0.0',
    port: 3000
  }
}); 