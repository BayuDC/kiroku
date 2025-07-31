<script setup lang="ts">
setTitle('Tambah Barang');
definePageMeta({
  middleware: ['auth'],
});

const consumable = useConsumableStore();

async function onSave() {
  if (await consumable.create()) {
    setAlert('Barang berhasil ditambahkan', 'success');
    await navigateTo('/consumables');
  }
}

onUnmounted(() => {
  consumable.reset();
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <div class="w-full">
        <FormConsumable @save="onSave" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
