<template>
  <div class="mb-4 block">
    <label :htmlFor="name" class="block text-lg mb-2 capitalize tracking-wide">
      {{ label }}
    </label>
    <vee-field
      :type="type"
      :name="name"
      class="h-9 w-full px-[0.375rem] p-3 rounded-lg bg-gray-50 border-[1px] border-solid border-gray-400"
      :placeholder="placeHolderProps"
      :disabled="isDisabled"
      :class="{ 'cursor-not-allowed bg-gray-200': isDisabled }"
    />
    <ErrorMessage class="text-red-600" :name="name" />
  </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

withDefaults(
  defineProps<{
    label: string;
    name: string;
    type: InputHTMLAttributes['type'];
    placeHolderProps?: string;
    isDisabled?: boolean;
    isRegister?: boolean;
  }>(),
  {
    placeHolderProps: '',
    isDisabled: false,
  },
);
</script>

<style scoped></style>
