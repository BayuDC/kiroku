<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';

definePageMeta({
  middleware: ['auth'],
});

const searchQUery = useRouteQuery('search');
const search = ref('');

const { data, refresh } = await useApi<any[]>('/consumables', {
  query: { search },
  default: () => [],
});

const modal = ref<any>(null);

async function onDeleted() {
  setAlert('Barang berhasil dihapus', 'success');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await refresh();
}
async function onFailed() {
  setAlert('Gagal menghapus barang', 'error');
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
        <Table :columns="['Nama', 'Stok', 'Deskripsi', 'Kategori']" :path="`/consumables/new`">
          <TableRow v-for="c in data" :key="c.id" :path="`/consumables/${c.id}`" @delete="modal.select(c.id, c.name)">
            <TableCell class="font-bold">{{ c.id }}</TableCell>
            <TableCell>{{ c.name }}</TableCell>
            <TableCell>{{ c.stock }}</TableCell>
            <TableCell>{{ c.description }}</TableCell>
            <TableCell>{{ c.category?.name || '-' }}</TableCell>
          </TableRow>
        </Table>
      </div>
      <Modal store="consumable" ref="modal" @deleted="onDeleted" @failed="onFailed" />
    </div>
  </div>
</template>

<style scoped></style>
