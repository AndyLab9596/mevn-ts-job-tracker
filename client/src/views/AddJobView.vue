<template>
  <DashboardContent :loadingState="inSubmission">
    <vee-form @submit="handleSubmit">
      <h3 class="text-3xl mb-4">Add Job</h3>
      <BaseAlert />
      <div
        class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 lg:items-center xl:grid-cols-3"
      >
        <BaseInputFormField label="Position" type="text" name="position" />
        <BaseInputFormField label="Company" type="text" name="company" />
        <BaseInputFormField label="Job Location" type="text" name="location" />
        <BaseSelectFormField
          label="Status"
          name="status"
          :options="searchStatusOptions"
        />
        <BaseSelectFormField
          label="Job Type"
          name="jobType"
          :options="searchJobTypeOptions"
        />

        <div class="flex justify-between items-center space-x-1 mb-2 mt-[34px]">
          <BaseButton type="submit" class="w-2/4"> Submit </BaseButton>
          <BaseButton type="button" class="w-2/4 bg-gray-500 hover:bg-gray-700">
            Clear
          </BaseButton>
        </div>
      </div>
    </vee-form>
  </DashboardContent>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ICreateJob } from '@/types/Job.type';
import { searchJobTypeOptions, searchStatusOptions } from '@/utils/constants';

const inSubmission = ref(false);
const handleSubmit = async (values: ICreateJob) => {
  console.log(values);
};
</script>

<style scoped></style>
