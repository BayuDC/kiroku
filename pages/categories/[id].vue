<script setup lang="ts">
setTitle('Edit Kategori');
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const id = route.params.id as string;

const category = useCategoryStore();
await category.load(parseInt(id));

async function onSave() {
  if (await category.update()) {
    setAlert('Kategori berhasil diperbarui', 'success');
    await navigateTo('/categories');
  }
}

onUnmounted(() => {
  category.reset();
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <div class="w-full">
        <FormCategory @save="onSave" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
