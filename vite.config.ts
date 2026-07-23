import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base is set for GitHub Pages project-site deploys; adjust the repo name at deploy time.
export default defineConfig({ plugins: [react()], base: '/' })
