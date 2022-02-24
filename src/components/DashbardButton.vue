<template>
  <div
    v-wave
    class="rounded-lg select-none cursor-pointer shadow-md bg-white p-4 flex items-center w-full"
    @click="clickButton"
  >
    <slot name="icon"></slot>
    <div class="text-base lg:text-xl font-bold text-center w-full flex-shrink">{{ text }}</div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router';

const props = defineProps<{
  text: string
  to?: string
}>()

function clickButton() {
  if (props.to) {
    router.push({ name: props.to })
  }
}
</script>
<style lang="css" scoped>
</style>  