<template>
  <div>
    <SearchSelect
      v-if="mode == 0"
      input-class="rounded-2xl text-sm border border-gray-400"
      :options="options"
      :label-prop="labelProp"
      :throttle="120"
      @search="search"
      @select="data = props.valueProp ? $event[props.valueProp] : $event"
    ></SearchSelect>
    <el-select-v2
      class="mode-1"
      v-else-if="mode == 1"
      v-model="data"
      value-key="id"
      filterable
      remote
      :remote-method="search"
      :loading="isLoading"
      :options="options"
      :placeholder="placeholder"
    ></el-select-v2>
  </div>
</template>
<script setup lang="ts">
import { AxiosResponse } from 'axios';
import SearchSelect from './SearchSelect.vue';
const isLoading = ref(false)
const options = ref<any[]>([])
const props = withDefaults(defineProps<{
  modelValue: any,
  searchApi: (kw: string) => Promise<AxiosResponse<Page<any>>>
  labelProp: string,
  valueProp?: string,
  placeholder?: string,
  mode?: number,
}>(), {
  placeholder: "输入关键字搜索"
})
const mode = computed(() => {
  return props.mode ?? 0
})
const emit = defineEmits<{
  (event: "update:modelValue", value: any): void
}>()
const data = computed({
  set: (value) => {
    emit('update:modelValue', value)
  },
  get: () => {
    return props.modelValue
  }
})

let preKw = ''

async function search(kw: string) {
  if (kw == '' || preKw.includes(kw)) {
    return
  }
  preKw = kw
  isLoading.value = true
  try {
    let resp = await props.searchApi(kw)
    if (mode.value == 0) {
      options.value = resp.data.content
    } else if (mode.value == 1) {
      options.value = resp.data.content.map(i => {
        return {
          label: i[props.labelProp],
          value: props.valueProp ? i[props.valueProp] : i
        }
      })
      console.log(options.value);
    }
  } catch (e: any) {
    ElMessage.error(e.msg)
  } finally {
    isLoading.value = false
  }
}
</script>
<style lang="css">
.el-select-v2__combobox-input {
  font-size: theme('fontSize.sm') !important;
}
</style>
