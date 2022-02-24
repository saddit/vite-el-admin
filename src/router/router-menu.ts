import { RouteRecordRaw } from 'vue-router';
import router from '@/router/index';

const routers = router.getRoutes()

export interface SubMenu {
    title: string
    icon?: string
    path?: string
    role?: string
    items: SubMenu[]
}

export const menus: SubMenu[] = []

function routerToMenu(raw: RouteRecordRaw, parent?: SubMenu) {
    const meta = raw.meta
    let menu: SubMenu | undefined = undefined
    if (meta?.showMenu) {
        menu = {
            title: meta.title!,
            path: raw.path,
            items: [],
            role: meta.role,
            icon: meta.icon
        }
        if (parent) {
            menu.path = parent.path + "/" + menu.path
            parent.items.push(menu)
        } else {
            menus.push(menu)
        }

    }
    raw.children?.forEach(c => {
        routerToMenu(c, menu);
    })
}

routers.forEach((value) => {
    if (value.children.length > 0) {
        routerToMenu(value)
    }
})

