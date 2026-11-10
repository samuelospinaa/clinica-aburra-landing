import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages sirve el sitio bajo /<nombre-del-repo>/
  base: '/clinica-aburra-landing/',
  plugins: [react()],
  server: { port: 5173 },
})
