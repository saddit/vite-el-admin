import { solveChains } from '../../api/table-solve-chain';
<template>
  <div class="w-full" v-loading.fullscreen.lock="loading">
    <el-descriptions title="详细数据" :column="SPANS" size="large" border>
      <el-descriptions-item
        v-for="col, i in _cols"
        :index="i"
        :span="getSpan(i, col)"
        :label="col.label"
      >
        <template v-if="!col.hideOnDetail && data[col.prop] != undefined">
        <!-- 数组内容 -->
          <template v-if="col.isArray">
            <!-- 嵌套的数组内容 -->
            <template v-if="col.elementColumns">
              <NestDetail
                class="my-1"
                v-for="itm, i in data[col.prop]"
                :key="i"
                :data="itm"
                :columns="col.elementColumns"
              ></NestDetail>
            </template>
            <!-- 简化的数组内容 -->
            <template v-else>
              <el-tag
                class="mx-1"
                v-for="itm, i in data[col.prop]"
                :key="i"
                size="small"
              >{{ solveChains(itm, col, data) }}</el-tag>
            </template>
          </template>
          <!-- 嵌套对象 -->
          <template v-else-if="col.isNest && col.elementColumns">
            <NestDetail :data="data[col.prop]" :columns="col.elementColumns"></NestDetail>
          </template>
          <template v-else>
            <span
              v-if="col.linkDetail != undefined"
              class="link-detail"
              @click="toDetail(col.linkDetail!, data[col.prop])"
            >{{ solveChains(data[col.prop], col, data) }}</span>
            <span v-else>{{ solveChains(data[col.prop], col, data) }}</span>
          </template>
        </template>
        <template v-else>无</template>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script setup lang="ts">
import { solveChains } from '@/components/layout/ts/table-solve-chain'
import NestDetail from "@/components/layout/NestDetail.vue"
import router from '@/router';

const SPANS = 3

const props = withDefaults(defineProps<{
  columns: Column[],
  data: any,
  loading: boolean
}>(), { loading: false })

const _cols = ref<Column[]>([])

function getSpan(index: number, col: Column) {
  if (col.isArray || col.isNest) {
    return SPANS
  } else if (index + 1 < _cols.value.length) {
    const next = _cols.value[index + 1]
    if (next.isArray || next.isNest) {
      return SPANS - index % SPANS
    }
  }
  return 1;
}

onBeforeMount(() => {
  _cols.value = props.columns
})

function toDetail(name: string, data: any) {
  router.push({
    name: name,
    params: {
      data: JSON.stringify(data)
    }
  })
}
</script>
<style lang="css" scoped>
</style>