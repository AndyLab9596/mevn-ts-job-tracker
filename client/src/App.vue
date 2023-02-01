<template>
  <div class="bg-gray-100 min-w-[400px]">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const isAutoLogout = computed(() => {
  return authStore.isAutoLogout;
});

watch(isAutoLogout, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    router.replace('/');
  }
});

onMounted(() => {
  authStore.autoLogin();
});
</script>
