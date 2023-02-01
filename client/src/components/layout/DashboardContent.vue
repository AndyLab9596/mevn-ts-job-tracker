<template>
  <section class="w-[90%] mx-0 my-auto px-8 py-0">
    <div class="rounded-lg w-full bg-white pt-12 pb-16 px-8">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    loadingState: boolean;
  }>(),
  {
    loadingState: false,
  },
);
</script>
