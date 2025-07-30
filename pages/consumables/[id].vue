<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const id = route.params.id as string;

const consumable = useConsumableStore();
await consumable.load(parseInt(id));

async function onSave() {
  if (await consumable.update()) {
    setAlert('Barang berhasil diperbarui', 'success');
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
