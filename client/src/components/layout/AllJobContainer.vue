<template>
  <section
    class="rounded-lg w-full bg-white pt-12 pb-16 px-8 grid grid-cols-1 xl:grid-cols-2 gap-4 relative"
  >
    <template v-if="globalStore.isLoading">
      <BaseCardSkeleton v-for="(_, index) in 6" :key="index" />
    </template>
    <div v-else-if="jobStore.totalJobs < 1 && !globalStore.isLoading">
      <h3>No job to display</h3>
    </div>
    <template v-else>
      <BaseCard v-for="job in jobStore.jobs" :key="job._id" :job="job" />
    </template>
    <div class="mt-8 flex justify-end items-center col-span-2">
      <BasePagination />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore';
import { useJobStore } from '@/stores/jobStore';
import BaseCard from '../ui/BaseCard.vue';
import BaseCardSkeleton from '../ui/BaseCardSkeleton.vue';
import BasePagination from '../ui/BasePagination.vue';

const globalStore = useGlobalStore();
const jobStore = useJobStore();
</script>
