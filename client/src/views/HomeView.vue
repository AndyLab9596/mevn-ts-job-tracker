<template>
  <section class="max-w-full overflow-x-hidden relative max-h-screen">
    <main class="flex">
      <BigSideBar />
      <div
        class="flex-1 w-full"
        :class="{ 'w-[85%]': globalStore.showSideBar }"
      >
        <DashboardNavbar />
        <div class="w-[90%] mx-auto my-0 py-8 px-0">
          <RouterView />
        </div>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import BigSideBar from '@/components/layout/BigSideBar.vue';
import DashboardNavbar from '@/components/layout/DashboardNavbar.vue';
import { useGlobalStore } from '@/stores/globalStore';

const globalStore = useGlobalStore();
</script>
