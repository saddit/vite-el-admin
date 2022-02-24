import { RouteRecordRaw } from 'vue-router'
import NotFound from '@/views/main/NotFound.vue';
import AccessDeny from '@/views/main/AccessDeny.vue';

const route = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: () => import('@/views/layout/MainApp.vue'),
        children: [{
            path: "/dashboard",
            name: "dashboard",
            component: () => import('@/views/main/Dashboard.vue'),
            meta: {
                title: "首页",
                showMenu: true,
                icon: "ant-design:home-outlined",
                showBreadcrumb: true,
                role: "ROLE_ADMIN",
            }
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/main/Login.vue'),
        meta: {
            title: '登录',
            showMenu: false,
            showBreadcrumb: false
        }
    },
    { path: '/:path(.*)', component: NotFound },
    { path: '/404', name: "404", component: NotFound },
    { path: '/403', name: "403", component: AccessDeny }
] as RouteRecordRaw[]

export default route