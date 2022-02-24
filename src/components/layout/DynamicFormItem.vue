<template>
  <component
    :is="formOption.type"
    v-model="data"
    :multiple="formOption.params?.multiple"
    :min="formOption.params?.min ?? -Infinity"
    :max="formOption.params?.max ?? +Infinity"
    :type="formOption.params?.type"
    :placeholder="formOption.placeholder"
    :class="formOption.params?.multiple ? 'w-1/2' : ''"
  >
    <template v-if="formOption.type == 'el-radio-group'">
      <el-radio v-for="itm in formOption.options" :label="itm.value">{{ itm.label }}</el-radio>
    </template>
    <template v-else-if="formOption.type == 'el-select'">
      <el-option
        v-for="itm in formOption.options"
        :key="itm.value"
        :label="itm.label"
        :value="itm.value"
      ></el-option>
    </template>
  </component>
</template>
<script setup lang="ts">
const props = defineProps<{
  formOption: FormOption,
  modelValue: any,
}>()

const emit = defineEmits<{
  (event: "update:modelValue", value: any): void
}>()

const data = computed({
  set: (value) => {
    emit('update:modelValue', value)
  },
  get: () => props.modelValue
})
</script>
<style lang="css">
.el-form-item__content {
  padding-top: 1px;
  padding-bottom: 1px;
}
.el-input {
  @apply lg:max-w-2xl max-w-[16rem] md:max-w-xs !important;
}
</style>