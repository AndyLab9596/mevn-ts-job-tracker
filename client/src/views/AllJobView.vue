<template>
  <section class="w-[90%] mx-0 my-auto px-8 py-0">
    <!-- <BaseDialog :show="isShowDialog" @close-dialog="closeDialog" typeOperate="Delete" @on-operate="onDeleteJob">
            {{ titleDialogDeleteJob }}
        </BaseDialog> -->

    <div>
      <SearchJobContainer />
      <h4 class="my-4 text-2xl font-semibold">
        {{ jobStore.totalJobs }} Job{{ jobStore.totalJobs > 1 ? 's' : '' }}
        Found
      </h4>
      <AllJobContainer />
    </div>
  </section>
</template>

<script setup lang="ts">
import AllJobContainer from '@/components/layout/AllJobContainer.vue';
import { useJobStore } from '@/stores/jobStore';
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import SearchJobContainer from '@/components/layout/SearchJobContainer.vue';

const jobStore = useJobStore();
const { page, search, searchStatus, searchType, sort } = storeToRefs(jobStore);

onMounted(() => {
  jobStore.getAllJob();
});

watch([page, searchStatus, searchType, sort], async () => {
  await jobStore.getAllJob();
});

let timerId: number | undefined;

watch(search, () => {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(async () => {
    try {
      await jobStore.getAllJob();
    } catch (error) {
      console.log(error);
    }
  }, 1000);
});
</script>

<style scoped></style>
