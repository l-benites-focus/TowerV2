import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  build: {
        manifest: true,
        outDir: "../Backend/dist/src",
        target: 'esnext',
        emptyOutDir: true,
        rollupOptions: {
         input: './src/main.ts',
       },
      },
  server: {
    origin: 'http://127.0.0.1:3000',
  },
})
