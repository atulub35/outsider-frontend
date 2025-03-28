import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: process.env.PORT || 3000
  },
  preview: {
    host: true,
    port: process.env.PORT || 3000,
    allowedHosts: [
      'outsider-react-8de83560ff04.herokuapp.com',
      '.herokuapp.com'  // This will allow all herokuapp.com subdomains
    ]
  }
})
