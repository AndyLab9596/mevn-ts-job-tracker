import NotFoundLogo from '@/components/svg/NotFoundLogo.vue';

<template>
  <main class="min-h-screen grid place-items-center text-center">
    <div>
      <NotFoundLogo />
      <h3 class="text-3xl mb-2 font-semibold">Ohh! Page Not Found</h3>
      <p class="text-gray-500 text-lg my-4">
        We can't seem to find the page you're looking for
      </p>
      <RouterLink
        :to="{ name: 'home' }"
        class="text-cyan-500 underline decoration-cyan-500 capitalize p-1"
      >
        Back Home
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import NotFoundLogo from '@/components/svg/NotFoundLogo.vue';
</script>
