<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';

setTitle('Daftar Peminjaman');

definePageMeta({
  middleware: ['auth'],
});

const searchQuery = useRouteQuery('search');
const search = ref('');

const { data, refresh } = await useApi<any[]>('/loans', {
  query: { search },
  default: () => [],
});

const modal = ref<any>(null);

async function onDeleted() {
  setAlert('Peminjaman berhasil dihapus', 'success');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await refresh();
}
async function onFailed() {
  setAlert('Gagal menghapus peminjaman', 'error');
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

function getStatusText(returnDate: string | null) {
  return returnDate ? 'Dikembalikan' : 'Dipinjam';
}

function getStatusClass(returnDate: string | null) {
  return returnDate ? 'text-green-600' : 'text-orange-600';
}
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <Alert2 />
      <div class="w-full">
        <Table :columns="['Peminjam', 'Petugas', 'Jumlah Alat', 'Tanggal Pinjam', 'Status']" :path="`/loans/new`">
          <TableRow
            v-for="loan in data"
            :key="loan.id"
            :path="`/loans/${loan.id}`"
            btn1="Detail"
            @delete="modal.select(loan.id, 'Peminjaman ' + loan.id + ' - ' + loan.used_by)"
          >
            <TableCell class="font-bold">{{ loan.id }}</TableCell>
            <TableCell>{{ loan.used_by }}</TableCell>
            <TableCell>{{ loan.staff.name }}</TableCell>
            <TableCell>{{ loan.tools_count }} alat</TableCell>
            <TableCell>{{ formatDate(loan.loan_date) }}</TableCell>
            <TableCell :class="getStatusClass(loan.return_date)">
              {{ getStatusText(loan.return_date) }}
            </TableCell>
          </TableRow>
        </Table>
      </div>
      <Modal store="loan" ref="modal" @deleted="onDeleted" @failed="onFailed" />
    </div>
  </div>
</template>

<style scoped></style>
