import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: ['es2022'],
    rollupOptions: {
      input: {
        website: path.resolve(__dirname, 'index.html'),
        app: path.resolve(__dirname, 'app/index.html'),
      },
    },
  },
})
