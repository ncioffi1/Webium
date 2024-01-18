import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    },
    // To automatically open the app in the browser whenever the server starts,
    // uncomment the following line:
    // open: true
  },
  build: {
    outDir: '../public',
    emptyOutDir: true
  }
})
