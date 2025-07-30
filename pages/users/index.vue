<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';

definePageMeta({
  middleware: ['auth'],
});

const searchQUery = useRouteQuery('search');
const search = ref('');

const { data, refresh } = await useApi<any[]>('/users', {
  query: { search },
  default: () => [],
});

const modal = ref<any>(null);

async function onDeleted() {
  setAlert('User berhasil dihapus', 'success');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await refresh();
}
async function onFailed() {
  setAlert('Gagal menghapus user', 'error');
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
        <Table :columns="['Nama', 'Username', 'Role']" :path="`/users/new`">
          <TableRow v-for="u in data" :key="u.id" :path="`/users/${u.id}`" @delete="modal.select(u.id, u.name)">
            <TableCell class="font-bold">{{ u.id }}</TableCell>
            <TableCell>{{ u.name }}</TableCell>
            <TableCell>{{ u.username }}</TableCell>
            <TableCell>
              <span v-if="u.role === 'admin'">Admin</span>
              <span v-else-if="u.role === 'staff'">Petugas</span>
            </TableCell>
          </TableRow>
        </Table>
      </div>
      <Modal store="user" ref="modal" @deleted="onDeleted" @failed="onFailed" />
    </div>
  </div>
</template>

<style scoped></style>
