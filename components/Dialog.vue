<script setup lang="ts">
const self = ref<HTMLDialogElement | null>(null);

const show = ref(false);

defineExpose({
  open() {
    show.value = true;
  },
  close() {
    show.value = false;
  },
});

defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <button
    class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    type="button"
    @click="show = true"
  >
    Open small modal
  </button>
  <div
    class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
    :class="[show ? 'flex' : 'hidden']"
  >
    <div class="relative w-auto my-6 mx-auto max-w-sm">
      <!--content-->
      <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <!--header-->
        <div class="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
          <h3 class="text-xl font-semibold">Konfirmasi</h3>
        </div>
        <!--body-->
        <div class="relative p-4 flex-auto">
          <slot />
        </div>
        <!--footer-->
        <div class="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
          <button
            class="text-gray-500 background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            @click="$emit('cancel')"
          >
            Tidak
          </button>
          <button
            class="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            @click="$emit('confirm')"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="opacity-25 fixed inset-0 z-40 bg-black" :class="[show ? 'flex' : 'hidden']"></div>
</template>

<style scoped></style>
