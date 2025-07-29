<script setup lang="ts">
defineProps<{
  message: string;
  type: 'success' | 'error';
}>();
</script>

<template>
  <div
    class="text-white text-sm px-6 py-4 border-0 rounded relative mb-4"
    :class="{
      'bg-emerald-500': type === 'success',
      'bg-red-500': type === 'error',
    }"
  >
    <span class="inline-block align-middle mr-8">
      <b class="capitalize">{{ message }}</b>
    </span>
  </div>
</template>

<style scoped></style>
