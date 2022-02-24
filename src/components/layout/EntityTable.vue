<template>
  <div class="w-full min-w-[880px]">
    <!-- tool bar -->
    <div class="flex space-x-4 px-2 py-3" v-if="config?.hideToolBar ?? true">
      <el-input
        v-if="canSearch"
        class="flex-shrink"
        :prefix-icon="SearchIcon()"
        v-model="keywords"
        placeholder="搜索"
        @change="emitSearch"
        clearable
      ></el-input>
      <el-date-picker
        v-model="datePair"
        type="daterange"
        range-separator="到"
        start-placeholder="开始日期"
        end-placeholder="截止日期"
      ></el-date-picker>
      <el-select v-model="pageDto.orderBy" placeholder="排序" clearable>
        <el-option v-for="item, i in orders" :key="i" :label="item.label" :value="item.prop"></el-option>
      </el-select>
      <el-checkbox v-model="pageDto.dir" true-label="ASC" false-label="DESC">逆序</el-checkbox>
      <slot name="ext-dto"></slot>
      <el-button v-if="canAddNew" type="success" @click="addNew">新增</el-button>
    </div>
    <el-table :data="data.content" border stripe>
      <template v-for="col in _columns" :key="col.prop">
        <el-table-column
          v-if="!col.hideOnIndex"
          :label="col.label"
          :show-overflow-tooltip="operation.tip"
        >
          <template #default="scope">
            <span
              v-if="col.linkDetail != undefined"
              class="link-detail"
              @click="routerTo(col.linkDetail!, scope.row[col.prop])"
            >{{ solveChains(scope.row[col.prop], col, scope.row) }}</span>
            <template v-else-if="col.isArray">
              <el-tag
                class="mx-1"
                v-for="itm, i in scope.row[col.prop]"
                :key="i"
                size="small"
              >{{ solveChains(itm, col, scope.row) }}</el-tag>
            </template>
            <span v-else>{{ solveChains(scope.row[col.prop], col, scope.row) }}</span>
          </template>
        </el-table-column>
      </template>
      <slot name="ext-col"></slot>
      <el-table-column
        v-if="_actions.length > 0"
        :fixed="operation.fixed"
        :min-width="operation.width"
      >
        <template #header>
          <div>
            <span class="float-left">操作</span>
            <el-checkbox
              class="float-right"
              v-model="temp"
              :label="true"
              :indeterminate="false"
              @change="fixedOperation"
              size="small"
            >固定</el-checkbox>
          </div>
        </template>
        <template #default="scope">
          <el-scrollbar>
            <div class="flex items-center divide-x py-2">
              <button
                v-wave
                class="inline-block px-4 hover:text-opacity-70 text-sm"
                v-for="act, i in _actions.slice(0, 3)"
                :class="getColor(act)"
                :key="i"
                @click="act.func(scope.row)"
              >{{ act.name }}</button>
              <template v-if="_actions.length > 3">
                <el-dropdown trigger="click" type="primary">
                  <button>
                    <DotsVerticalIcon class="w-5 h-5 text-gray-500 hover:text-opacity-50" />
                  </button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item v-for="act, i in _actions.slice(3)" :key="i">
                        <button
                          class="text-sm"
                          @click="act.func(scope.row)"
                          :class="getColor(act)"
                        >{{ act.name }}</button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </div>
          </el-scrollbar>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-10 mb-5 mx-auto w-fit" v-if="config?.pageable ?? true">
      <el-pagination
        v-model:current-page="pageDto.pageNum"
        :page-sizes="[15, 25, 30]"
        v-model:page-size="pageDto.pageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="data.total"
        background
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
export interface EntityTableConfig<T = any> {
  name?: string
  hideToolBar?: boolean
  pageable?: boolean
  canAdd?: boolean
  canSearch?: boolean
  canRemove?: boolean
  routeToAdd?: boolean
  routeToModify?: boolean
  routeToDetail?: boolean
  deleteApi?: (en: T) => Promise<AxiosResponse>
  queryApi?: (dto: BaseDto, page: PageDto) => Promise<AxiosResponse<Page<T>>>
  searchApi?: (kw: string, page: PageDto) => Promise<AxiosResponse<Page<T>>>
}
</script>
<script setup lang="ts">
import {
  DotsVerticalIcon
} from "@heroicons/vue/solid"
import { SearchIcon } from "@heroicons/vue/outline"
import util from '@/utils/util'
import { solveChains } from "@/components/layout/ts/table-solve-chain"
import router from '@/router';
import { AxiosResponse } from "axios";
import { ElMessageBox } from "element-plus";

const props = defineProps<{
  modelValue: Page<any>
  columns: Column[]
  actions?: EntityAction<any>[]
  extDto?: any
  name: string
  config?: EntityTableConfig<any>
}>()

const canAddNew = computed(() => {
  return props.config?.canAdd ?? true
})
const canRemove = computed(() => {
  return props.config?.canRemove ?? true
})
const canSearch = computed(() => {
  return props.config?.canSearch ?? true
})
const data = computed({
  set: value => {
    emit("update:modelValue", value)
  },
  get: () => {
    return props.modelValue
  }
})

onMounted(() => {
  emitQuery()
})
const temp = ref(false)
const operation = reactive<any>({
  fixed: false,
  width: undefined,
  tip: true
})
function fixedOperation(value: boolean) {
  if (value) {
    operation.fixed = "right"
    let i = _actions.value.length > 3 ? 3 : _actions.value.length
    operation.width = i * 50
    operation.tip = false
  } else {
    operation.fixed = false
    operation.width = undefined
    operation.tip = true
  }
}

const orders = reactive<Column[]>([])
const _columns = ref<Column[]>([])
const _actions = ref<EntityAction[]>([])

const emit = defineEmits<{
  (event: "onQuery", dto: BaseDto, page: PageDto): void
  (event: "onSearch", kw: string): void
  (event: "onRemove", en: any): void
  (event: "addNew", cols: Column[]): void
  (event: "beforeMounted"): void
  (event: "update:modelValue", val: Page<any>): void
}>()

function initOrders() {
  orders.push({
    prop: "",
    label: "默认排序"
  })
  _columns.value.forEach(col => {
    if (!col.hideOnIndex && !col.notSort) {
      orders.push(col)
    }
  })
}

function initColumns() {
  _columns.value = props.columns
}

function initActions() {
  if (props.config) {
    if (props.config.routeToDetail) {
      _actions.value.push({
        name: "详情",
        func: (entity: any) => {
          routerTo(props.name + "-detail", entity)
        }
      })
    }
    if (props.config.routeToModify) {
      _actions.value.push({
        name: "修改",
        func: (entity: any) => {
          routerTo(props.name + "-modify", entity)
        }
      })
    }
    if (canRemove.value) {
      _actions.value.push({
        name: "删除",
        func: emitRemove
      })
    }
  }
  if (props.actions) {
    _actions.value.push(...props.actions)
  }
  if (props.extDto) {
    watch(props.extDto, () => {
      emitQuery()
    }, { deep: true })
  }
}

function emitRemove(en: any) {
  ElMessageBox.confirm(
    '删除操作不可恢复且会删除相关数据，是否继续?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    if (props.config && props.config.deleteApi) {
      util.tryCatch(async () => {
        await props.config!.deleteApi!(en)
        ElMessage.success("删除成功")
        let temp = unref(data)
        temp.total -= 1
        const idx = temp.content.findIndex(i => i.id == en.id)
        temp.content.splice(idx, 1)
        data.value = temp
      })
    }
    emit("onRemove", en)
  })
}

function addNew() {
  if (canAddNew.value && props.config?.routeToAdd) {
    router.push({ name: props.name + "-modify", query: { 'new': 'true' } })
  }
  emit('addNew', props.columns)
}

onBeforeMount(() => {
  emit("beforeMounted")
  initColumns()
  initOrders()
  initActions()
})

function routerTo(name: string, data: any) {
  if (data == undefined) {
    return;
  }
  router.push({
    name: name,
    params: {
      data: JSON.stringify(data)
    }
  })
}

const datePair = ref<[Date?, Date?]>([])
const keywords = ref("")
const baseDto = reactive<BaseDto>({})
const pageDto = reactive<PageDto>({
  pageNum: 1,
  pageSize: 15,
  orderBy: "",
  dir: "ASC"
})

defineExpose({
  baseDto, pageDto
})

function getColor(act: EntityAction) {
  return act.color ?? 'text-blue-400';
}


function emitQuery() {
  let temp: any
  if (props.extDto) {
    temp = { ...baseDto, ...props.extDto }
  } else {
    temp = baseDto
  }
  if (props.config && props.config.queryApi) {
    util.tryCatch(async () => {
      let resp = await props.config!.queryApi!(temp, pageDto)
      data.value = resp.data
    })
  }
  // console.log(temp)
  emit("onQuery", temp, pageDto)
}

function emitSearch() {
  if (keywords.value == "") {
    return;
  }
  if (props.config && props.config.searchApi) {
    util.tryCatch(async () => {
      let resp = await props.config!.searchApi!(keywords.value, { pageNum: 1, pageSize: pageDto.pageSize })
      data.value = resp.data
    })
  }
  emit("onSearch", keywords.value)
}

watch(datePair, (value) => {
  baseDto.dateStart = value[0]
  baseDto.dateEnd = value[1]
  emitQuery()
})
watch(pageDto, (value) => {
  emitQuery()
}, { deep: true })
</script>
<style scoped>
</style>