<template>
  <article
    class="bg-white grid-rows-2 shadow-md px-4 py-8 rounded-lg border-[1px] border-cyan-100 hover:shadow-xl transition-shadow duration-300 animate-pulse"
  >
    <header
      class="row-auto p-1 border-b-slate-300 border-b-2 flex items-center"
    >
      <div
        class="w-14 h-14 rounded-xl uppercase grid place-items-center bg-slate-200 text-xl font-bold mr-8 text-white"
      ></div>
      <div class="">
        <h5 class="mb-2 text-lg"></h5>
        <p class="m-0 capitalize text-gray-400 tracking-wide"></p>
      </div>
    </header>
    <div class="row-span-full">
      <div class="py-4 px-6 grid grid-cols-2 gap-2">
        <div class="mt-2 flex items-center">
          <vue-feather
            type="navigation"
            class="mr-4 flex items-center"
            stroke-width="2.5"
            stroke="#9ca3af"
          >
          </vue-feather>
          <div
            class="capitalize tracking-wider bg-slate-200 w-24 h-7 rounded-lg"
          ></div>
        </div>
        <div class="mt-2 flex items-center">
          <vue-feather
            type="calendar"
            class="mr-4 flex items-center"
            stroke-width="2.5"
            stroke="#9ca3af"
          >
          </vue-feather>
          <span
            class="capitalize tracking-wider bg-slate-200 w-24 h-7 rounded-lg"
          >
          </span>
        </div>
        <div class="mt-2 flex items-center">
          <vue-feather
            type="briefcase"
            class="mr-4 flex items-center"
            stroke-width="2.5"
            stroke="#9ca3af"
          >
          </vue-feather>
          <span
            class="capitalize tracking-wider bg-slate-200 w-24 h-7 rounded-lg"
          >
          </span>
        </div>
        <div
          class="rounded-md capitalize tracking-wider text-center w-24 h-7 bg-slate-200 text-yellow-600 text-sm leading-7"
        ></div>
      </div>
      <footer class="mt-4 px-6">
        <div></div>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts"></script>

<style scoped></style>
