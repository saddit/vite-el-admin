import 'vue-router'
import { VNodeChild, RenderFunction } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    title?: string
    role?: Role
    showMenu: boolean
    icon?: string,
    showBreadcrumb: boolean
  }
}