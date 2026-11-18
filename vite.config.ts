import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // im Docker-Container von außen erreichbar
    port: 5173,
    watch: { usePolling: true }, // erkennt Dateiänderungen auch bei Volumes unter Windows
  },
});
