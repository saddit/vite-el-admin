import { Directive } from "vue";
import type { DirectiveBinding } from "vue";

const vAuth: Directive<any, Role> = {
    deep: false,
    mounted(el: HTMLElement, binding: DirectiveBinding<Role>) {
        const { value } = binding;
        if (value) {
            const authRole = value;
            // console.log(authRole)
            const hasAuth = store.getters.hasRole(authRole)
            // console.log(hasAuth)
            if (!hasAuth) {
                el.parentNode?.removeChild(el);
            }
        }
    }
}

export default {
    install(app: import('vue').App) {
        app.directive("auth", vAuth);
    }
}