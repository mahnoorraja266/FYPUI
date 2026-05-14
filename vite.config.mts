import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'next/navigation': path.resolve(__dirname, './src/lib/next-navigation-mock.ts'),
      'next/image': path.resolve(__dirname, './src/lib/next-image-mock.tsx'),
    },
  },
  base: './', // Ensures relative assets loading inside Electron filesystem protocol
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
