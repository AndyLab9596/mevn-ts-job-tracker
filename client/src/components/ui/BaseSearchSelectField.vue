<template>
  <div class="mb-2 block">
    <label :htmlFor="name" class="block text-lg mb-2 capitalize tracking-wide">
      {{ label }}
    </label>
    <select
      :name="name"
      class="h-9 w-full px-[0.375rem] -p-3 rounded-lg bg-gray-50 border-[1px] border-solid border-gray-400"
      v-model="localModelValue"
    >
      <option disabled value="">Please select one</option>
      <option
        v-for="(option, index) in options"
        :key="`${index}${option}`"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { TSearchJobType, TSearchStatus, TSort } from '@/types/Job.type';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    name: string;
    isDisabled?: boolean;
    options: string[];
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
  set(value: (typeof props.options)[number]) {
    emits('update:modelValue', value);
  },
});
</script>

<style scoped></style>
