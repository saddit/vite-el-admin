<template>
  <el-container class="h-full w-full">
    <el-aside width="fit" class="overflow-y-hidden bg-gray-menu">
      <el-scrollbar>
        <PermissionMenu :close="isMenuClose" />
      </el-scrollbar>
    </el-aside>

    <el-container class="h-full w-full">
      <el-header class="bg-white border-b">
        <div class="h-full flex justify-between items-center">
          <!-- header left -->
          <div class="flex items-center">
            <button class="mr-2 text-blue-400" @click="isMenuClose = !isMenuClose">
              <LogoutIcon
                class="w-5 h-5 will-change-transform duration-500 transition-transform"
                :class="isMenuClose ? 'rotate-0' : 'rotate-180'"
              />
            </button>
            <Breadcrumb />
          </div>
          <!-- header right -->
          <div class="mx-4">
            <span class="text-blue-400 hover:underline cursor-pointer text-xs" @click="logout">退出登录</span>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { LogoutIcon } from '@heroicons/vue/solid'
import PermissionMenu from '@/components/PermissionMenu.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import router from '@/router';

const isMenuClose = ref(false)

function logout() {
  store.commit("clear", "all")
  router.push("/login")
}
</script>
<style scoped>
</style>
