import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carica le variabili di ambiente
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      __APP_ENV__: env.APP_ENV,
      'process.env': env
    },
    build: {
      outDir: 'dist',
    },
  };
});
