import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  
  return {
    plugins: [
      vue(),
      vueJsx()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5173,
      host: true
    },
    preview: {
      port: 5173,
      host: true,
      allowedHosts: ['installer-app-j68mk.ondigitalocean.app']
    }
  }
})
