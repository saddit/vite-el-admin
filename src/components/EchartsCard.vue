<template>
  <div class="p-5 border border-gray-200 rounded-md">
    <slot name="top"></slot>
    <div :class="bodyClass || 'chart'" :id="idKey"></div>
    <slot name="bottom"></slot>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'

const props = defineProps<{
  idKey: string,
  option: echarts.EChartsOption | any,
  bodyClass?: string,
}>()

const emit = defineEmits<{
  (event: "click-item", param: ECEventParams): void
}>()

watch(props.option, option => {
  if (!option.dataset) {
    option.dataset = {
      source: []
    }
  }
  chart.setOption(option)
})

let chart = {} as echarts.EChartsType

function initialize() {
  chart = echarts.init(document.getElementById(props.idKey)!)
  if (!props.option.dataset) {
    props.option.dataset = {
      source: []
    }
  }
  chart.setOption(props.option)
  chart.on('click', params => emit('click-item', params as ECEventParams))
  window.onresize = function () {
    chart.resize();
  };
}

onMounted(() => {
  initialize()
})
</script>
<style scope>
.chart {
  min-width: 400px;
  min-height: 300px;
}
</style>