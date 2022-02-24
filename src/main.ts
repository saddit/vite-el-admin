import { createApp } from 'vue'
import App from '@/App.vue'
import '@/tailwind.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import VWave from 'v-wave'
import store from '@/store'
import router from '@/router/index'
import vAuth from '@/directives/v-auth'
import 'default-passive-events'

const app = createApp(App)

app.mixin({
  methods: {
    getAssets(name: string) {
      return new URL(`./assets/${name}`, import.meta.url).href;
    },
  }
})

app
  .use(router)
  .use(store)
  .use(ElementPlus, { locale: zhCn })
  .use(VWave)
  .use(vAuth)
  .mount('#app')
