import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {port: 1234},
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'envConfig': fileURLToPath(new URL(`./src/configs/${mode}.ts`, import.meta.url)),
      }
    },
  }
})
