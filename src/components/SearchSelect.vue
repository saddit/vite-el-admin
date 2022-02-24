<template>
  <div class="relative">
    <div class="flex justify-center items-center" :class="inputClass">
      <input
        v-model="kw"
        type="text"
        class="m-0 w-full h-full px-2"
        :placeholder="placeholder"
        @focusin="onFocusin"
        @focusout="onFocusout"
      />
      <SearchCircleIcon
        class="w-7 h-7 mx-2 text-blue-500 antialiased hover:text-blue-300 cursor-pointer transition-colors duration-200"
        @click="doSearch"
      ></SearchCircleIcon>
    </div>
    <transition name="el-zoom-in-top">
      <div
        v-show="showList"
        class="absolute left-0 border border-inherit top-7 z-50 bg-white rounded h-fit grid grid-cols-1 divide-y divide-gray-200"
      >
        <button
          type="button"
          @click="emit('select', s)"
          v-for="(s, i) in options"
          :key="i"
          v-wave
          style="font-size: inherit;"
          class="text-blue-400 px-3 hover:bg-blue-50 bg-opacity-5"
        >{{ s[labelProp] }}</button>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import Lock from "@/utils/Lock";
import { SearchCircleIcon } from "@heroicons/vue/outline"

const emit = defineEmits<{
  (event: "search", kw: string): void
  (event: "select", value: any): void
}>()
const props = withDefaults(
  defineProps<{
    inputClass?: string
    placeholder?: string
    options: any[]
    labelProp: string
    throttle?: number,
  }>(),
  {
    iptClass: "",
    placeholder: "输入关键字搜索",
    throttle: 300
  }
)

const kw = ref("")
const showList = ref(false)
let keywordStack: string[] = []
let throttleTimer = -1
let preshow = 0
const lock = new Lock()

function doThrottle() {
  let cur = new Date().getTime();
  let interval = cur - preshow;
  preshow = cur;
  return interval <= props.throttle;
}

watch(kw, async () => {
  let unlock = await lock.getLock()
  keywordStack.push(kw.value);
  unlock()
  if (doThrottle()) return;
  doSearch(kw.value);
})

function doSearch(value: string) {
  if (value == "") {
    return;
  }
  showList.value = true;
  // this.hintList = this.getHints(value).slice(0, this.maxRes);
  emit("search", value)
}

function onFocusout() {
  setTimeout(() => {
    showList.value = false;
  }, 150);
  if (throttleTimer != -1) {
    clearInterval(throttleTimer)
    throttleTimer = -1
  }
  keywordStack = []
}

function onFocusin() {
  throttleTimer = setInterval(async () => {
    let unlock = await lock.getLock()
    if (keywordStack.length == 0 || doThrottle()) {
      unlock();
      return;
    }
    let keyw = keywordStack.pop()!;
    keywordStack = []
    unlock();
    doSearch(keyw);
  }, props.throttle);
}
</script>
<style lang="css" scoped>
input[type='text'] {
	background:none;  
	outline:none;  
	border: none;
  font-size: inherit;
  @apply py-1;
}
input[type='text']:focus {
  border-radius: inherit;
}
input[type='text']::-webkit-input-placeholder {
  color: theme('textColor.gray.400');
}
</style>