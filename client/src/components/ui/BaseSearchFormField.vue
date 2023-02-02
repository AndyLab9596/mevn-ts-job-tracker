<template>
  <div class="mb-2 block">
    <label :htmlFor="name" class="block text-lg mb-2 capitalize tracking-wide">
      {{ label }}
    </label>
    <input
      type="text"
      :name="name"
      :disabled="isDisabled"
      class="h-9 w-full px-[0.375rem] p-3 rounded-lg bg-gray-50 border-[1px] border-solid border-gray-400"
      v-model="localModelValue"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    name: string;
    isDisabled?: boolean;
    modelValue: string;
  }>(),
  {
    isDisabled: false,
  },
);

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const localModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});
</script>

<style scoped></style>
