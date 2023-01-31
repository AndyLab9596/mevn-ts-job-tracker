<template>
  <div
    v-show="globalStore.showAlert"
    class="px-1 py-2 my-4 rounded-lg text-center tracking-wide text-sm"
    :class="{
      'text-red-700 bg-red-200': globalStore.alertType === 'danger',
      'text-green-700 bg-green-200': globalStore.alertType === 'success',
    }"
  >
    {{ globalStore.alertText }}
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore';

const globalStore = useGlobalStore();
</script>
