<script setup lang="ts">
defineProps<{
  path: string;
  freeze?: boolean;
}>();

defineEmits<{
  (e: 'save'): void;
}>();
</script>

<template>
  <div class="relative flex max-w-screen-sm flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div class="block w-full overflow-x-auto bg-blueGray-200">
      <div class="flex-auto px-4 lg:px-6 py-6">
        <form @submit.prevent="$emit('save')">
          <div class="flex flex-wrap">
            <slot />
            <div class="mt-4 flex gap-2" v-if="!freeze">
              <NuxtLink
                :to="path"
                class="bg-gray-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Batal
              </NuxtLink>
              <button
                class="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
