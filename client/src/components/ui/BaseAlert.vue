<template>
  <div
    v-show="showAlert"
    class="px-1 py-2 my-4 rounded-lg text-center tracking-wide text-sm"
    :class="{
      'text-red-700 bg-red-200': alertType === 'danger',
      'text-green-700 bg-green-200': alertType === 'success',
    }"
  >
    {{ alertText }}
  </div>
</template>

<script setup lang="ts">
const alertText = 'Testing';
const alertType = 'danger';
const showAlert = true;
</script>
