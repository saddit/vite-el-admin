<template>
  <el-breadcrumb :separator-icon="ChevronRightIcon()">
    <el-breadcrumb-item
      class="text-sm"
      v-for="(r,index) in routeMatch"
      :to="r.path"
      :key="index"
    >{{ r.name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/solid'

const routeMatch = computed(() => {
  // 根据路由配置meta中的showInbreadcrumb字段过滤
  const route = useRoute()
  const m = route.matched
  let matchedArr = m.filter((item) => {
    return item.meta.showBreadcrumb
  });
  const res = matchedArr.map(i=>{
    return {
      name: i.meta.title,
      path: i.path
    }
  });
  if(res.find(i=>i.path == "/dashboard") == undefined) {
    res.splice(0,0,{
      name: "首页",
      path: "/dashboard"
    })
  }
  return res;
})
</script>
<style lang="css" scoped>
</style>