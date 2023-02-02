<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="backdrop fixed h-screen w-full top-0 left-0 bg-black opacity-75 z-10"
    ></div>
    <Transition name="dialog" mode="out-in">
      <dialog
        open
        v-if="show"
        class="content fixed top-[30vh] left-[10%] w-[50%] z-50 rounded-xl shadow-2xl overflow-hidden bg-white"
      >
        <header
          class="border-b-[1px] border-blue-500 pb-2 font-bold leading-8 text-xl text-red-500"
        >
          <h2>Are you sure want to continue this process?</h2>
        </header>
        <section class="p-3 text-lg font-semibold h-20 text-gray-700">
          <slot></slot>
        </section>
        <menu class="w-[50%] ml-auto flex space-x-4 items-center">
          <BaseButton @click="handleOperate" isDangerouseStyle>
            {{ typeOperate }}
          </BaseButton>
          <BaseButton @click="handleCloseDialog"> Close </BaseButton>
        </menu>
      </dialog>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  typeOperate: string;
}>();

const emits = defineEmits(['closeDialog', 'onOperate']);

const handleCloseDialog = () => {
  emits('closeDialog');
};

const handleOperate = () => {
  emits('onOperate');
};
</script>

<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
