<template>
  <div class="pt-8 flex flex-col">
    <IconLink
      v-for="link in linkArray"
      :key="link.id"
      :nameRoute="link.nameRoute"
      :icon="link.icon"
    >
      {{ link.text }}
    </IconLink>
  </div>
</template>

<script setup lang="ts">
import IconLink from '@/components/layout/IconLink.vue';

const linkArray = [
  { id: 1, text: 'Stats', nameRoute: 'stats', icon: 'pie-chart' },
  { id: 2, text: 'All Jobs', nameRoute: 'all-jobs', icon: 'search' },
  { id: 3, text: 'Add Job', nameRoute: 'add-job', icon: 'file-plus' },
  { id: 4, text: 'Profile', nameRoute: 'profile', icon: 'user' },
];
</script>
