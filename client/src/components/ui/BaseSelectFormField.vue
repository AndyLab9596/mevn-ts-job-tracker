<template>
  <div class="mb-2 block">
    <label :htmlFor="name" class="block text-lg mb-2 capitalize tracking-wide">
      {{ label }}
    </label>
    <vee-field
      as="select"
      :name="name"
      class="h-9 w-full px-[0.375rem] -p-3 rounded-lg bg-gray-50 border-[1px] border-solid border-gray-400"
    >
      <option disabled value="">Please select one</option>
      <option
        v-for="(option, index) in options"
        :key="`${index}${option}`"
        :value="option"
      >
        {{ option }}
      </option>
    </vee-field>
    <ErrorMessage class="text-red-600" :name="name" />
  </div>
</template>

<script setup lang="ts">
import type { TSearchJobType, TSearchStatus, TSort } from '@/types/Job.type';

withDefaults(
  defineProps<{
    label: string;
    name: string;
    isDisabled?: boolean;
    options: TSearchJobType | TSearchStatus | TSort;
  }>(),
  {
    isDisabled: false,
  },
);
</script>

<style scoped></style>
