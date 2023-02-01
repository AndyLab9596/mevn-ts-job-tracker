<template>
  <section class="w-[90%] mx-0 my-auto px-8 py-0">
    <!-- <BaseDialog :show="isShowDialog" @close-dialog="closeDialog" typeOperate="Delete" @on-operate="onDeleteJob">
            {{ titleDialogDeleteJob }}
        </BaseDialog> -->

    <div>
      <!-- <SearchJobContainer /> -->
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
import { onMounted } from 'vue';

const jobStore = useJobStore();

onMounted(() => {
  jobStore.getAllJob();
});
</script>

<style scoped></style>
