<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
setTitle('Edit Alat');

const route = useRoute();
const id = route.params.id as string;

const tool = useToolStore();
await tool.load(parseInt(id));

async function onSave() {
  if (await tool.update()) {
    setAlert('Alat berhasil diperbarui', 'success');
    await navigateTo('/tools');
  }
}

onUnmounted(() => {
  tool.reset();
});

const { data } = await useApi<{ data: any }>(`/tools/${id}/history`, {
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
        <FormTool @save="onSave" />
        <Table path="" :columns="['Tanggal', 'Pemakai', 'Kondisi Awal', 'Kondisi Akhir', 'Petugas']">
          <template #header>
            <h6 class="text-blueGray-700 text-lg font-bold">Peminjaman Terakhir</h6>
          </template>

          <TableRow no-button v-for="loan in data.data" :key="loan.id" :path="`/loans/${loan.id}`">
            <TableCell class="font-bold">{{ loan.loan_id }}</TableCell>
            <TableCell>{{ loan.loan_date }}</TableCell>
            <TableCell>{{ loan.used_by }}</TableCell>
            <TableCell>
              <span
                class="text-sm px-2 py-1 rounded"
                :class="{
                  'bg-blue-100 text-blue-600': loan.condition_before === 'good',
                  'bg-orange-100 text-orange-600': loan.condition_before === 'broken',
                }"
              >
                {{ loan.condition_before === 'good' ? 'Baik' : 'Rusak' }}
              </span>
            </TableCell>
            <TableCell>
              <span v-if="!loan.condition_after">-</span>
              <span
                v-else
                class="text-sm px-2 py-1 rounded"
                :class="{
                  'bg-blue-100 text-blue-600': loan.condition_after === 'good',
                  'bg-orange-100 text-orange-600': loan.condition_after === 'broken',
                }"
              >
                {{ loan.condition_after === 'good' ? 'Baik' : 'Rusak' }}
              </span>
            </TableCell>
            <TableCell>{{ loan.staff }}</TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
