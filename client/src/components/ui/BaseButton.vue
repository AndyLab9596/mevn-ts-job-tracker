<template>
  <button
    :type="type"
    class="text-base text-white p-[6px] bg-cyan-500 hover:bg-cyan-700 border-transparent rounded-md capitalize block w-full shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
    :class="{ 'bg-red-500 hover:bg-red-700 text-white': isDangerouseStyle }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';
defineProps<{
  type: ButtonHTMLAttributes['type'];
  isDangerouseStyle?: boolean;
}>();
</script>

<style scoped></style>
