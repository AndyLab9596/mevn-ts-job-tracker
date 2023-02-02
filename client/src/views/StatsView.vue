<template>
  <DashboardContent>
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        class="p-8 bg-white rounded-lg border-b-4 border-solid border-yellow-500"
      >
        <header class="flex items-center justify-between">
          <span class="font-bold text-5xl text-yellow-500">
            <!-- {{ statPending }} -->
          </span>
          <span
            class="w-[70px] h-[60px] bg-yellow-100 flex items-center justify-center rounded-md"
          >
            <vue-feather
              size="32"
              type="briefcase"
              stroke="#f59e0b"
            ></vue-feather>
          </span>
        </header>
        <h5 class="pt-5 mt-2 mx-0 mb-0 capitalize leading-5 text-left text-xl">
          pending applications
        </h5>
      </article>

      <article
        class="p-8 bg-white rounded-lg border-b-4 border-solid border-blue-500"
      >
        <header class="flex items-center justify-between">
          <span class="font-bold text-5xl text-blue-500">
            <!-- {{ statInterview }} -->
          </span>
          <span
            class="w-[70px] h-[60px] bg-blue-100 flex items-center justify-center rounded-md"
          >
            <vue-feather
              size="32"
              type="check-square"
              stroke="#3b82f6"
            ></vue-feather>
          </span>
        </header>
        <h5 class="pt-5 mt-2 mx-0 mb-0 capitalize leading-5 text-left text-xl">
          interviews scheduled
        </h5>
      </article>

      <article
        class="p-8 bg-white rounded-lg border-b-4 border-solid border-rose-500"
      >
        <header class="flex items-center justify-between">
          <span class="font-bold text-5xl text-rose-500">
            <!-- {{ statDeclined }} -->
          </span>
          <span
            class="w-[70px] h-[60px] bg-rose-100 flex items-center justify-center rounded-md"
          >
            <vue-feather size="32" type="x" stroke="#f43f5e"></vue-feather>
          </span>
        </header>
        <h5 class="pt-5 mt-2 mx-0 mb-0 capitalize leading-5 text-left text-xl">
          jobs declined
        </h5>
      </article>
    </section>

    <section class="mt-16 p-14">
      <h4 class="text-center mb-3">Monthly Applications</h4>
      <!-- <ChartContainer :chartLabelAr="chartLabel" :chartDataAr="chartData" /> -->
    </section>
  </DashboardContent>
</template>

<script setup lang="ts"></script>

<style scoped></style>
