<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    error?: string;
    options?: any[];
  }>(),
  {
    label: 'Label',
    error: '',
    options: () => [],
  }
);

const value = defineModel();
</script>
<template>
  <div class="relative w-full mb-3">
    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">{{ label }}</label>
    <select
      v-model="value"
      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      :class="[error ? 'bg-red-100' : 'bg-white']"
    >
      <option value="" disabled>Select an option</option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
    <label
      v-if="error"
      class="block text-blueGray-600 text-xs font-medium mb-2 mt-1 text-red-500"
      htmlfor="grid-password"
      >{{ error }}</label
    >
  </div>
</template>

<style scoped></style>
