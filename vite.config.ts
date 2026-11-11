import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo at /horse-management-app/. Local dev stays at /.
  base: process.env.GITHUB_ACTIONS ? '/horse-management-app/' : '/',
})
