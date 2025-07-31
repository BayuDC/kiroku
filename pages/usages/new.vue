<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const usage = useUsageStore();

async function onSave() {
  if (await usage.create()) {
    setAlert('Pemakaian berhasil ditambahkan', 'success');
    await navigateTo('/usages');
  } else {
    setAlert('Gagal menambahkan pemakaian', 'error');
  }
}

onUnmounted(() => {
  usage.reset();
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <div class="max-w-screen-sm w-full">
        <Alert2 />
      </div>
      <div class="w-full">
        <FormUsage @save="onSave" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
