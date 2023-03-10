<template>
  <DashboardContent :loadingState="inSubmission">
    <vee-form
      @submit="handleSubmit"
      :validation-schema="validationSchema"
      :initial-values="initialValues"
      v-slot="{ handleReset }"
    >
      <h3 class="text-3xl mb-4">Add Job</h3>
      <BaseAlert />
      <div
        class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 lg:items-center xl:grid-cols-3"
      >
        <BaseInputFormField label="Position" type="text" name="position" />
        <BaseInputFormField label="Company" type="text" name="company" />
        <BaseInputFormField
          label="Job Location"
          type="text"
          name="jobLocation"
        />
        <BaseSelectFormField
          label="Status"
          name="status"
          :options="searchStatusOptions.filter((o) => o !== 'all')"
        />
        <BaseSelectFormField
          label="Job Type"
          name="jobType"
          :options="searchJobTypeOptions.filter((t) => t !== 'all')"
        />
        <div class="flex justify-between items-center space-x-1 mb-2 mt-[34px]">
          <BaseButton
            type="submit"
            class="w-2/4"
            :isDisabled="inSubmission"
            :isLoading="inSubmission"
          >
            Submit
          </BaseButton>
          <BaseButton
            type="button"
            class="w-2/4 bg-gray-500 hover:bg-gray-700"
            :isDisabled="inSubmission"
            @click="handleClearForm(handleReset)"
          >
            Clear
          </BaseButton>
        </div>
      </div>
    </vee-form>
  </DashboardContent>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ICreateJob } from '@/types/Job.type';
import { searchJobTypeOptions, searchStatusOptions } from '@/utils/constants';
import type { FormContext } from 'vee-validate';
import { useJobStore } from '@/stores/jobStore';

const jobStore = useJobStore();
const initialValues = computed(() => {
  if (jobStore.editJobValues) return jobStore.editJobValues;
  else
    return {
      position: '',
      company: '',
      status: '',
      jobType: '',
      jobLocation: '',
    };
});
const inSubmission = ref(false);
const validationSchema = {
  position: 'required|min:3|max:50',
  company: 'required|min:3|max:50',
  status: 'required|min:3|max:30',
  jobType: 'required|min:3|max:30',
  jobLocation: 'required|min:3|max:50',
};

const handleClearForm = (clearForm: FormContext['resetForm']) => {
  clearForm();
  if (jobStore.isEditing) {
    jobStore.resetJobEdit();
  }
};

const handleSubmit = async (values: ICreateJob, actions: FormContext) => {
  console.log(values);
  inSubmission.value = true;
  await jobStore.setupJob(values);
  inSubmission.value = false;
  actions.resetForm();
  if (jobStore.isEditing) {
    jobStore.resetJobEdit();
  }
};
</script>

<style scoped></style>
