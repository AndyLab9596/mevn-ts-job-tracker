<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px">
      <li>
        <span
          class="cursor-pointer py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="handlePreviousPage"
        >
          Previous
        </span>
      </li>
      <li v-for="n in jobStore.numOfPages" :key="n">
        <span
          class="cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="{ 'text-blue-800 bg-blue-200': jobStore.page === n }"
          @click="handleChangePage(n)"
        >
          {{ n }}
        </span>
      </li>
      <li>
        <span
          class="cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="handleNextPage"
        >
          Next
        </span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useJobStore } from '@/stores/jobStore';

const jobStore = useJobStore();
const handleNextPage = () => {
  jobStore.nextPage();
};
const handlePreviousPage = () => {
  jobStore.previousPage();
};
const handleChangePage = (page: number) => {
  jobStore.handleChangePage(page);
};
</script>
