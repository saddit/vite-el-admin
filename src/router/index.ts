import { createRouter, createWebHistory } from 'vue-router'
import defRouter from '@/router/module/default-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...defRouter,
  ],
})

router.beforeEach((to, from, next) => {
  const requireRole = to.meta.role
  if (to.name != 'login' && !store.getters.isAuth) {
    next({ name: 'login' })
  } else if (requireRole != undefined && !store.getters.hasRole(requireRole)) {
    next({ name: '403' })
  } else {
    next()
  }
})

export default router