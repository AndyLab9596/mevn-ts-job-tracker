<template>
  <article
    class="bg-white grid-rows-2 shadow-md px-4 py-8 rounded-lg border-[1px] border-cyan-100 hover:shadow-xl transition-shadow duration-300"
  >
    <header
      class="row-auto p-1 border-b-slate-300 border-b-2 flex items-center"
    >
      <div
        class="w-14 h-14 rounded-xl uppercase grid place-items-center bg-cyan-500 text-xl font-bold mr-8 text-white"
      >
        {{ job.company.charAt(0) }}
      </div>
      <div class="">
        <h5 class="mb-2 text-lg">{{ job.company }}</h5>
        <p class="m-0 capitalize text-gray-400 tracking-wide">
          {{ job.position }}
        </p>
      </div>
    </header>
    <div class="row-span-full">
      <div class="py-4 px-6 grid grid-cols-2 gap-2">
        <div class="mt-2 flex items-center">
          <vue-feather
            type="navigation"
            class="mr-4 flex items-center"
            stroke-width="2.5"
            stroke="#9ca3af"
          >
          </vue-feather>
          <span class="capitalize tracking-wider">
            {{ job.jobLocation }}
          </span>
        </div>
        <div class="mt-2 flex items-center">
          <vue-feather
            type="calendar"
            class="mr-4 flex items-center"
            stroke-width="2.5"
            stroke="#9ca3af"
          >
          </vue-feather>
          <span class="capitalize tracking-wider">
            {{ moment(job.createdAt).format('MMM Do, YY') }}
          </span>
        </div>
        <div class="mt-2 flex items-center">
          <vue-feather
            type="briefcase"
            class="mr-4 flex items-center"
            stroke-width="2.5"
            stroke="#9ca3af"
          >
          </vue-feather>
          <span class="capitalize tracking-wider">
            {{ job.jobType }}
          </span>
        </div>
        <div
          class="rounded-md capitalize tracking-wider text-center w-24 h-7 bg-yellow-200 text-yellow-600 text-sm leading-7"
          :class="{
            'bg-yellow-200 text-yellow-600': job.status === 'pending',
            'bg-red-300 text-red-600': job.status === 'declined',
            'bg-blue-200 text-blue-600': job.status === 'interview',
          }"
        >
          {{ job.status }}
        </div>
      </div>
      <footer class="mt-4 px-6">
        <div>
          <button
            @click="handleEditJob(job._id)"
            class="bg-green-200 text-green-700 mr-3 cursor-pointer px-4 py-2 rounded-md text-sm font-normal"
          >
            Edit
          </button>
          <button
            @click="handleDeleteJob(job._id)"
            class="bg-red-200 text-red-700 cursor-pointer rounded-md px-2 py-2 text-sm font-normal"
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useJobStore } from '@/stores/jobStore';
import type { IJobInfo } from '@/types/Job.type';
import moment from 'moment';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

defineProps<{
  job: IJobInfo;
}>();

const jobStore = useJobStore();
const router = useRouter();

const openDialog = inject<(id: string) => void>('dialog');

const handleEditJob = (jobId: string) => {
  jobStore.editJob(jobId);
  router.push({ name: 'add-job' });
};

const handleDeleteJob = (jobId: string) => {
  openDialog && openDialog(jobId);
};
</script>

<style scoped></style>
