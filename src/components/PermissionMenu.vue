<template>
  <el-menu
    router
    class="menu-vertical"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    :collapse="close"
    :default-active="$route.path"
  >
    <template v-for="sub in menus">
      <template v-if="sub.items.length > 0">
        <el-sub-menu :index="sub.title">
          <template #title>
            <div class="mr-1 h-full flex items-center">
              <Icon class="w-5 h-5" v-if="sub.icon" :icon="sub.icon"></Icon>
            </div>
            <span>{{ sub.title }}</span>
          </template>
          <el-menu-item
            v-for="m,j in sub.items"
            :key="j"
            :index="m.path"
            v-auth="m.role"
          >{{ m.title }}</el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="sub.path" v-auth="sub.role">
          <div class="mr-1 h-full flex items-center">
            <Icon class="w-5 h-5" v-if="sub.icon" :icon="sub.icon"></Icon>
          </div>
          <template #title>
            <span>{{ sub.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script setup lang="ts">
import { menus } from '@/router/router-menu'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<{
  close: boolean
}>(), { close: false })
</script>
<style lang="css" scoped>
.menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>