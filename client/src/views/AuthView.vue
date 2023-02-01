<template>
  <section class="grid items-center min-h-screen">
    <vee-form
      @submit="handlSubmitAuth"
      class="max-w-[400px] w-[90vw] mx-auto px-8 py-8 bg-white rounded-lg border-t-[5px] border-t-cyan-500 transition duration-300 ease-in shadow-lg hover:shadow-2xl"
      :validation-schema="validationSchema"
    >
      <JobifyLogo class-props="h-[50px] block mx-auto mt-0 mb-3" />
      <h3 class="text-3xl text-center mb-2">
        {{ isRegisterMode ? 'Register' : 'Login' }}
      </h3>
      <BaseAlert />
      <BaseInputFormField
        label="Name"
        type="text"
        name="name"
        v-if="isRegisterMode"
      />
      <BaseInputFormField
        label="Last Name"
        type="text"
        name="lastName"
        v-if="isRegisterMode"
      />
      <BaseInputFormField
        label="Location"
        type="text"
        name="location"
        v-if="isRegisterMode"
      />
      <BaseInputFormField label="Email" type="email" name="email" />
      <BaseInputFormField label="Password" type="password" name="password" />
      <BaseInputFormField
        label="Confirm Password"
        type="password"
        name="confirm_password"
        v-if="isRegisterMode"
      />
      <BaseButton
        type="submit"
        class="mt-8"
        :isDisabled="!!isInSubmission"
        :isLoading="!!isInSubmission"
      >
        {{ submitButtonTitle }}
      </BaseButton>
      <p class="text-center text-lg mt-4 mx-0 font-semibold">
        {{ isRegisterMode ? 'Already a member?' : 'Not a member yet?' }}
        <button
          type="button"
          @click="toggleMode"
          class="text-cyan-500 font-bold"
        >
          {{ isRegisterMode ? 'Login' : 'Register' }}
        </button>
      </p>
    </vee-form>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import JobifyLogo from '@/components/svg/JobifyLogo.vue';
import type { ILoginInfo, IRegisterInfo } from '@/types/Form.type';
import { useAuthStore } from '@/stores/authStore';
import type { IAuthActionProps } from '@/types/Store.type';

const authStore = useAuthStore();

const isInSubmission = ref(false);
const isRegisterMode = ref(false);

const submitButtonTitle = computed(() => {
  if (isInSubmission.value) {
    return 'Processing...';
  } else {
    return isRegisterMode.value ? 'Register' : 'Login';
  }
});

const handlSubmitAuth = async (values: IRegisterInfo | ILoginInfo) => {
  isInSubmission.value = true;
  const payload: IAuthActionProps = {
    authInfo: values,
    authType: isRegisterMode.value === true ? 'register' : 'login',
  };
  await authStore.authAction(payload);
  isInSubmission.value = false;
};

const validationSchema = computed(() => {
  if (isRegisterMode.value === false) {
    return {
      email: 'required|min:3|max:30|email',
      password: 'required|min:3|max:30',
    };
  } else {
    return {
      email: 'required|min:3|max:30|email',
      password: 'required|min:3|max:30',
      confirm_password: 'password_mismatch:@password',
      name: 'required|min:3|max:100|alpha_spaces',
      lastName: 'required|min:3|max:30|alpha_spaces',
      location: 'required|min:3|max:100|alpha_spaces',
    };
  }
});

const toggleMode = () => {
  isRegisterMode.value = !isRegisterMode.value;
};
</script>

<style scoped></style>
