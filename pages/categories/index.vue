<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';

setTitle('Daftar Kategori');
definePageMeta({
  middleware: ['auth'],
});

const searchQuery = useRouteQuery('search');
const search = ref('');

const { data, refresh } = await useApi<any[]>('/categories', {
  query: { search },
  default: () => [],
});

const modal = ref<any>(null);

async function onDeleted() {
  setAlert('Kategori berhasil dihapus', 'success');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await refresh();
}
async function onFailed() {
  setAlert('Gagal menghapus kategori', 'error');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

watchThrottled(
  searchQuery,
  async () => {
    search.value = (searchQuery.value as string) || '';
  },
  { throttle: 1000 }
);
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <Alert2 />
      <div class="w-full">
        <Table :columns="['Nama']" :path="`/categories/new`">
          <TableRow v-for="c in data" :key="c.id" :path="`/categories/${c.id}`" @delete="modal.select(c.id, c.name)">
            <TableCell class="font-bold">{{ c.id }}</TableCell>
            <TableCell>{{ c.name }}</TableCell>
          </TableRow>
        </Table>
      </div>
      <Modal store="category" ref="modal" @deleted="onDeleted" @failed="onFailed" />
    </div>
  </div>
</template>

<style scoped></style>
