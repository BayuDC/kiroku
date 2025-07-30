<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const tool = useToolStore();

async function onSave() {
  if (await tool.create()) {
    setAlert('Alat berhasil ditambahkan', 'success');
    await navigateTo('/tools');
  }
}

onUnmounted(() => {
  tool.reset();
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <div class="w-full">
        <FormTool @save="onSave" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
