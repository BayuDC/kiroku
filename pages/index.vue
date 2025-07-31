<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <div class="max-w-screen-sm w-full">
        <Alert2 />
      </div>
      <div class="w-full">
        <div class="relative flex max-w-screen-sm flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div class="block w-full overflow-x-auto bg-blueGray-200">
            <div class="flex-auto px-4 lg:px-6 py-6">
              <div class="text-2xl">Selamat Datang di</div>
              <div class="mt-2 text-4xl font-bold">Kiroku Invetory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
