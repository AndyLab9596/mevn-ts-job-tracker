<template>
  <DashboardContent :loadingState="globalStore.isLoading">
    <vee-form
      @submit="handleSubmit"
      :initial-values="initialValues"
      :validation-schema="validationSchema"
    >
      <h3 class="text-3xl mb-4">Profile</h3>
      <BaseAlert />
      <div
        class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 lg:items-center xl:grid-cols-3"
      >
        <BaseInputFormField label="Name" type="text" name="name" />
        <BaseInputFormField label="Last Name" type="text" name="lastName" />
        <BaseInputFormField label="Email" type="email" name="email" />
        <BaseInputFormField label="Location" type="text" name="location" />
        <div class="mt-[18px]">
          <BaseButton
            type="submit"
            :isDisabled="inSubmission"
            :isLoading="inSubmission"
          >
            Save Changes
          </BaseButton>
        </div>
      </div>
    </vee-form>
  </DashboardContent>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGlobalStore } from '@/stores/globalStore';
import type { IUserInfo } from '@/types/Form.type';
import { useAuthStore } from '@/stores/authStore';

const globalStore = useGlobalStore();
const authStore = useAuthStore();
const inSubmission = ref(false);

const validationSchema = {
  email: 'required|min:3|max:30|email',
  name: 'required|min:3|max:100|alpha_spaces',
  lastName: 'required|min:3|max:30|alpha_spaces',
  location: 'required|min:3|max:100|alpha_spaces',
};

const initialValues = computed(() => {
  return authStore.user;
});

const handleSubmit = (values: IUserInfo) => {
  console.log(values);
};
</script>

<style scoped></style>
