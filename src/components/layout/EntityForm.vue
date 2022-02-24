<template>
  <el-form
    :model="data"
    class="min-w-[16rem] lg:min-w-[560px] space-y-10"
    ref="entityForm"
    label-width="120px"
    :rules="rules"
  >
    <slot name="top"></slot>
    <template v-for="col in columns">
      <el-form-item v-if="col.edit && col.formOption" :label="col.label" :prop="col.prop">
        <DynamicFormItem v-model="data[col.prop]" :form-option="col.formOption"></DynamicFormItem>
      </el-form-item>
    </template>
    <slot name="bottom"></slot>
    <el-form-item>
      <el-button type="primary" @click="submitForm">{{submitLabel}}</el-button>
      <slot name="footbar"></slot>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ELForm } from './ts/elform';
import DynamicFormItem from './DynamicFormItem.vue';
const entityForm = ref<ELForm>()
const props = withDefaults(defineProps<{
  columns: Column[],
  modelValue: any,
  requireAll?: boolean,
  rules?: ExtFormRule[],
  submitLabel?: string
}>(), { requireAll: true, submitLabel: "提交" })

const rules = reactive<FormRuleMap>({})

onBeforeMount(() => {
  if (props.rules) {
    props.rules.forEach(r => {
      if (!rules[r.prop]) {
        rules[r.prop] = []
      }
      rules[r.prop].push(...r.rules)
    })
  }
  props.columns.forEach(c => {
    if (c.edit && c.formOption) {
      if(!rules[c.prop]) {
        rules[c.prop] = []
      }
      if (c.formOption.rule) {
        rules[c.prop].push(c.formOption.rule)
      }
      if (props.requireAll && c.formOption.rule?.required != true) {
        rules[c.prop].push({ required: true, trigger: 'blur', message: `${c.label}必须填写` })
      }
    }
  })
  // console.log(rules)
})

async function submitForm() {
  entityForm.value?.validate((isValid) => {
    if (isValid) {
      emit("submit", data.value);
    } else {
      emit("invalid", data.value);
    }
  })
}

const emit = defineEmits<{
  (event: "update:modelValue", value: any): void
  (event: "submit", value: any): void
  (event: "invalid", value: any): void
}>()

const data = computed({
  set: (value) => {
    emit('update:modelValue', value)
  },
  get: () => props.modelValue
})

function addRule(prop: string, rule: FormRule) {
  if (rules[prop] == undefined) {
    rules[prop] = []
  }
  rules[prop].push(rule)
}

defineExpose<EntityFormRef>({
  form: entityForm.value!,
  addRule
})
</script>
<script lang="ts">
export interface EntityFormRef {
  form: ELForm
  addRule: (prop: string, rule: FormRule) => void
}
export type FormRuleMap = { [key: string]: FormRule[] }
export type ExtFormRule = { rules: FormRule[], prop: string }
</script>
<style lang="css" scoped>
</style>