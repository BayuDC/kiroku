<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';

const search = useRouteQuery('search');
</script>

<template>
  <div class="relative w-full px-2 max-w-full flex-grow flex-1">
    <div class="max-w-48">
      <div class="relative flex w-full flex-wrap items-stretch">
        <span
          class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1"
        >
          <i class="fas fa-search"></i>
        </span>
        <input
          type="text"
          v-model="search"
          placeholder="Ketik untuk mencari"
          class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
