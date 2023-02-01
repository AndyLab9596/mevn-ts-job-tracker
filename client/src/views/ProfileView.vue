<template>
  <DashboardContent :loadingState="inSubmission">
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
        <div class="mb-2 block mt-[34px]">
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
import { useAuthStore } from '@/stores/authStore';
import type { IUserInfo } from '@/types/Form.type';
import { computed, ref } from 'vue';

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

const handleSubmit = async (values: IUserInfo) => {
  inSubmission.value = true;
  await authStore.updateUser(values);
  inSubmission.value = false;
};
</script>

<style scoped></style>
