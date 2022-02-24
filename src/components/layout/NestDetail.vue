<template>
  <div>
    <el-descriptions size="small" :column="SPANS">
      <el-descriptions-item
        v-for="col, i in _columns"
        :index="i"
        :span="getSpan(i, col)"
        :label="col.label"
      >
        <template v-if="data[col.prop] != undefined">
          <template v-if="col.isArray">
            <el-tag
              class="mx-1"
              v-for="itm, i in data[col.prop]"
              :key="i"
              size="small"
            >{{ solveChains(itm, col, data) }}</el-tag>
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
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script setup lang="ts">
import { solveChains } from '@/components/layout/ts/table-solve-chain'
import router from '@/router';

const SPANS = 2;

const props = defineProps<{
  data: any,
  columns: Column[]
}>()

const _columns = ref<Column[]>([])

onBeforeMount(() => {
  _columns.value = props.columns
})

function getSpan(index: number, col: Column) {
  if (col.isArray || col.isNest) {
    return SPANS
  } else if (index + 1 < _columns.value.length) {
    const next = _columns.value[index + 1]
    if (next.isArray || next.isNest) {
      return SPANS - index % SPANS
    }
  }
  return 1;
}

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