<template>
  <RouterLink
    :to="{ name: nameRoute }"
    class="flex justify-center items-center py-4 capitalize transition duration-300 ease-linear group hover:bg-cyan-100 overflow-hidden"
    :active-class="'bg-cyan-100'"
    v-slot="{ isActive }"
  >
    <div
      class="w-32 flex items-center pl-8 group-hover:translate-x-2 transition duration-300 ease-linear"
    >
      <vue-feather
        :type="icon"
        class="-ml-12 mr-4"
        stroke-width="2.5"
        :stroke="isActive ? '#06b6d4' : '#164e63'"
      ></vue-feather>
      <span
        class="text-lg text-gray-500"
        :class="{ 'text-slate-600': isActive }"
      >
        <slot :active="isActive"></slot>
      </span>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  nameRoute: string;
  icon: string;
}>();
</script>
