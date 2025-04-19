import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Game_Card_Phaser_Vite_React",
  plugins: [react()],
});
