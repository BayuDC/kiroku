<script setup lang="ts">
setTitle('Edit Barang');
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

const { data } = await useApi<{ data: any }>(`/consumables/${id}/history`, {
  key: `history-${id}`,
  default: () => ({
    data: [],
  }),
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <div class="w-full">
        <FormConsumable @save="onSave" />
        <Table path="" :columns="['Tanggal', 'Pemakai', 'Jumlah', 'Petugas']">
          <template #header>
            <h6 class="text-blueGray-700 text-lg font-bold">Riwayat Pemakaian</h6>
          </template>

          <TableRow no-button v-for="usage in data.data" :key="usage.usage_id" :path="`/usages/${usage.usage_id}`">
            <TableCell class="font-bold">{{ usage.usage_id }}</TableCell>
            <TableCell>{{ new Date(usage.date).toLocaleDateString('id-ID') }}</TableCell>
            <TableCell>{{ usage.used_by }}</TableCell>
            <TableCell>{{ usage.quantity }}</TableCell>
            <TableCell>{{ usage.staff }}</TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
