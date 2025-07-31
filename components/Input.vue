<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
  }>(),
  {
    type: 'text',
    label: 'Label',
    error: '',
  }
);

const value = defineModel();
</script>

<template>
  <div class="relative w-full mb-3">
    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">{{ label }}</label>
    <input
      v-model="value"
      :type="type"
      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      :class="[error ? 'bg-red-100' : 'bg-white']"
      :disabled="disabled"
    />
    <label
      v-if="error"
      class="block text-blueGray-600 text-xs font-medium mb-2 mt-1 text-red-500"
      htmlfor="grid-password"
      >{{ error }}</label
    >
  </div>
</template>

<style scoped></style>
