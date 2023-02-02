<template>
  <section class="rounded-lg w-full bg-white pt-12 pb-16 px-8">
    <div class="w-full">
      <h3 class="text-3xl mb-4">Search Form</h3>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 pt-4"
      >
        <BaseSearchFormField
          label="Search"
          type="text"
          name="search"
          v-model="searchInput"
        />
        <BaseSearchSelectField
          label="Status"
          name="searchStatus"
          v-model="searchStatus"
          :options="[...searchStatusOptions]"
        />
        <BaseSearchSelectField
          label="Job Type"
          name="searchType"
          v-model="searchType"
          :options="[...searchJobTypeOptions]"
        />
        <BaseSearchSelectField
          label="Sort"
          name="sort"
          v-model="sort"
          :options="[...sortOptions]"
        />
        <div class="h-[36px] mt-[35px] w-full">
          <BaseButton
            type="button"
            is-dangerouse-style
            @click="jobStore.clearSearchFilter"
          >
            Clear Filters
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useJobStore } from '@/stores/jobStore';
import type { TSearchJobType, TSearchStatus, TSort } from '@/types/Job.type';
import {
  searchJobTypeOptions,
  searchStatusOptions,
  sortOptions,
} from '@/utils/constants';
import type { WritableComputedRef } from 'vue';
import { computed } from 'vue';
import BaseSearchFormField from '../ui/BaseSearchFormField.vue';
import BaseSearchSelectField from '../ui/BaseSearchSelectField.vue';

const jobStore = useJobStore();

const sort: WritableComputedRef<TSort> = computed({
  get() {
    return jobStore.sort;
  },
  set(value): void {
    return jobStore.changeJobSearch('sort', value);
  },
});

const searchType: WritableComputedRef<TSearchJobType> = computed({
  get() {
    return jobStore.searchType;
  },
  set(value): void {
    return jobStore.changeJobSearch('searchType', value);
  },
});

const searchStatus: WritableComputedRef<TSearchStatus> = computed({
  get() {
    return jobStore.searchStatus;
  },
  set(value): void {
    return jobStore.changeJobSearch('searchStatus', value);
  },
});

const searchInput: WritableComputedRef<string> = computed({
  get() {
    return jobStore.search;
  },
  set(value: string): void {
    return jobStore.changeJobSearch('search', value);
  },
});
</script>

<style scoped></style>
