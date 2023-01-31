<template>
  <aside
    class="sideBar flex-shrink-0 max-h-screen h-auto min-h-screen shadow-lg bg-white sticky top-0 transition-all duration-300 ease-in"
    :class="{
      'w-[15%] opacity-100': globalStore.showSideBar,
      'w-0 opacity-0': !globalStore.showSideBar,
    }"
  >
    <section>
      <header class="flex justify-center items-center my-6">
        <JobifyLogoVue class-props="h-[50px]" />
      </header>
      <NavLinks />
    </section>
  </aside>
</template>

<script setup lang="ts">
import JobifyLogoVue from '@/components/svg/JobifyLogo.vue';
import NavLinks from '@/components/layout/NavLinks.vue';
import { useGlobalStore } from '@/stores/globalStore';

const globalStore = useGlobalStore();
</script>

<style></style>
