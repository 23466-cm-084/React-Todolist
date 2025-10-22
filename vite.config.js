import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'   // <-- import react plugin
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),          // <-- use react() after importing
    tailwindcss(),
  ],
  base: '/React-Todolist',   // <-- your GitHub repo name
});
