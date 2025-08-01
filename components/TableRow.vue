<script setup lang="ts">
defineProps<{
  path: string;
  btn1?: string;
  btn2?: string;
  noButton?: boolean;
}>();

defineEmits<{
  (e: 'delete'): void;
}>();
</script>

<template>
  <tr>
    <slot />
    <td v-if="!noButton" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
      <NuxtLink
        :to="path"
        class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
      >
        {{ btn1 || 'Edit' }}
      </NuxtLink>
      <button
        class="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        @click="$emit('delete')"
      >
        {{ btn2 || 'Hapus' }}
      </button>
    </td>
  </tr>
</template>

<style scoped></style>
