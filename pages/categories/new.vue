<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const category = useCategoryStore();

async function onSave() {
  if (await category.create()) {
    setAlert('Kategori berhasil ditambahkan', 'success');
    await navigateTo('/categories');
  }
}

onUnmounted(() => {
  category.reset();
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap">
      <div class="w-full">
        <FormCategory @save="onSave" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
