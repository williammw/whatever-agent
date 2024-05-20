import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  console.log(`Running in ${mode} mode`);

  // Custom configuration based on mode
  const isMobile = mode === 'mobile';

  return {
    plugins: [react()],
    server: {
      host: isMobile ? '0.0.0.0' : 'localhost',
      port: 5173,
      // Remove COOP and COEP headers
      // headers: {
      //   'Cross-Origin-Opener-Policy': 'same-origin',
      //   'Cross-Origin-Embedder-Policy': 'require-corp',
      // },
      
    },
  };
});
