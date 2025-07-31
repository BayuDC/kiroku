<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';

setTitle('Daftar Pemakaian');

definePageMeta({
  middleware: ['auth'],
});

const searchQuery = useRouteQuery('search');
const search = ref('');

const { data, refresh } = await useApi<any[]>('/usages', {
  query: { search },
  default: () => [],
});

const modal = ref<any>(null);

async function onDeleted() {
  setAlert('Pemakaian berhasil dihapus', 'success');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await refresh();
}
async function onFailed() {
  setAlert('Gagal menghapus pemakaian', 'error');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

watchThrottled(
  searchQuery,
  async () => {
    search.value = (searchQuery.value as string) || '';
  },
  { throttle: 1000 }
);

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <Alert2 />
      <div class="w-full">
        <Table :columns="['Pemakai', 'Petugas', 'Jumlah', 'Waktu']" :path="`/usages/new`">
          <TableRow
            v-for="usage in data"
            :key="usage.id"
            :path="`/usages/${usage.id}`"
            btn1="Detail"
            @delete="modal.select(usage.id, 'Pemakaian ' + usage.id + ' - ' + usage.used_by)"
          >
            <TableCell class="font-bold">{{ usage.id }}</TableCell>
            <TableCell>{{ usage.used_by }}</TableCell>
            <TableCell>{{ usage.staff.name }}</TableCell>
            <TableCell>{{ usage.consumables_count }} barang</TableCell>
            <TableCell>{{ formatDate(usage.date) }}</TableCell>
          </TableRow>
        </Table>
      </div>
      <Modal store="usage" ref="modal" @deleted="onDeleted" @failed="onFailed" />
    </div>
  </div>
</template>

<style scoped></style>
