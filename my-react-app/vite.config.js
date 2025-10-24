import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:5001", // ← CHANGED TO 5002
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
