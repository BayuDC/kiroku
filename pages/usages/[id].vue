<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
setTitle('Detail Pemakaian');

const route = useRoute();
const id = route.params.id as string;

const usage = useUsageStore();
await usage.load(parseInt(id));

onUnmounted(() => {
  usage.reset();
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <div class="w-full">
        <FormUsage freeze />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
