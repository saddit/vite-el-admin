import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          '@/api/': [
            ['default', 'api']
          ],
          'element-plus': [
            'ElMessage'
          ],
          'qs': [
            ['default', 'qs']
          ],
          '@/store': [
            ['default', 'store']
          ],
          '@/axios': [
            ['default', 'useAxios']
          ],
        }
      ],
      dts: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
    },
  },
})
