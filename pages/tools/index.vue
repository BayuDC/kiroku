<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';

definePageMeta({
  middleware: ['auth'],
});

const searchQUery = useRouteQuery('search');
const search = ref('');

const { data, refresh } = await useApi<any[]>('/tools', {
  query: { search },
  default: () => [],
});

const modal = ref<any>(null);

async function onDeleted() {
  setAlert('Alat berhasil dihapus', 'success');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await refresh();
}
async function onFailed() {
  setAlert('Gagal menghapus alat', 'error');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

watchThrottled(
  searchQUery,
  async () => {
    search.value = (searchQUery.value as string) || '';
  },
  { throttle: 1000 }
);
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <Alert2 />
      <div class="w-full">
        <Table :columns="['Nama', 'Status', 'Kondisi', 'Deskripsi', 'Kategori']" :path="`/tools/new`">
          <TableRow v-for="t in data" :key="t.id" :path="`/tools/${t.id}`" @delete="modal.select(t.id, t.name)">
            <TableCell class="font-bold">{{ t.id }}</TableCell>
            <TableCell>{{ t.name }}</TableCell>
            <TableCell>
              <span v-if="t.status == 'available'">Tersedia</span>
              <span v-else-if="t.status == 'borrowed'">Dipinjam</span>
            </TableCell>
            <TableCell>
              <span v-if="t.condition == 'good'">Baik</span>
              <span v-else>Rusak</span>
            </TableCell>
            <TableCell>
              <div class="max-w-64 truncate">
                {{ t.description }}
              </div>
            </TableCell>
            <TableCell>{{ t.category?.name || '-' }}</TableCell>
          </TableRow>
        </Table>
      </div>
      <Modal store="tool" ref="modal" @deleted="onDeleted" @failed="onFailed" />
    </div>
  </div>
</template>

<style scoped></style>
