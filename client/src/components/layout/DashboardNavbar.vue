<template>
  <nav
    class="h-20 flex items-center justify-center bg-white shadow-lg sticky top-0 z-10"
  >
    <div class="w-[90%] mx-auto flex justify-between items-center">
      <button
        class="flex justify-center items-center"
        @click="globalStore.toggleSideBar"
      >
        <vue-feather
          type="align-left"
          stroke-width="2.5"
          stroke="#06b6d4"
          size="28"
        ></vue-feather>
      </button>
      <h3 class="text-2xl font-semibold">Dashboard</h3>
      <div class="flex justify-between items-center space-x-4">
        <button
          class="flex justify-center items-center shadow-xl hover:bg-cyan-700 bg-cyan-500 text-white border-transparent rounded-md py-1 px-4 space-x-2 transition duration-300 ease-in-out"
        >
          <vue-feather size="18" type="user-check"></vue-feather>
          <span>{{ userFullName }}</span>
          <vue-feather size="18" type="corner-right-down"></vue-feather>
        </button>
        <button
          @click="logout"
          class="flex justify-center items-center shadow-xl hover:bg-cyan-700 bg-cyan-500 text-white border-transparent rounded-md py-1 px-4"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useGlobalStore } from '@/stores/globalStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const userFullName = computed(
  () => authStore.user?.lastName + ' ' + authStore.user?.name,
);
const logout = () => {
  authStore.logout();
  router.push('/landing');
};
</script>

<style scoped></style>
