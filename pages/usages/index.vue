<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router';

setTitle('Daftar Pemakaian');

definePageMeta({
  middleware: ['auth'],
});

const searchQuery = useRouteQuery('search');
const pageQuery = useRouteQuery('page');
const search = ref('');
const page = ref(1);

interface PaginationData {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

const { data, refresh } = await useApi<PaginationData>('/usages', {
  query: { search, page },
  default: () => ({
    current_page: 1,
    data: [],
    first_page_url: '',
    from: 0,
    last_page: 1,
    last_page_url: '',
    links: [],
    next_page_url: null,
    path: '',
    per_page: 15,
    prev_page_url: null,
    to: 0,
    total: 0,
  }),
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
    page.value = 1; // Reset to first page when searching
  },
  { throttle: 1000 }
);

watchThrottled(
  pageQuery,
  async () => {
    page.value = parseInt((pageQuery.value as string) || '1');
  },
  { throttle: 500 }
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

function goToPage(pageNumber: number) {
  if (pageNumber >= 1 && pageNumber <= data.value.last_page) {
    navigateTo({
      path: '/usages',
      query: {
        ...useRoute().query,
        page: pageNumber.toString(),
      },
    });
  }
}

function goToPrevious() {
  if (data.value.prev_page_url) {
    goToPage(data.value.current_page - 1);
  }
}

function goToNext() {
  if (data.value.next_page_url) {
    goToPage(data.value.current_page + 1);
  }
}
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <Alert2 />
      <div class="w-full">
        <Table :columns="['Pemakai', 'Petugas', 'Jumlah', 'Waktu']" :path="`/usages/new`">
          <TableRow
            v-for="usage in data.data"
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
        <!-- pagination -->
        <div class="mb-6" v-if="data.last_page > 1">
          <nav class="block">
            <ul class="flex pl-0 rounded list-none flex-wrap">
              <!-- Previous button -->
              <li>
                <button
                  @click="goToPrevious"
                  :disabled="!data.prev_page_url"
                  :class="[
                    'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500',
                    data.prev_page_url
                      ? 'bg-white text-pink-500 hover:bg-pink-50 cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed',
                  ]"
                >
                  <i class="fas fa-chevron-left -ml-px"></i>
                </button>
              </li>

              <!-- Page numbers -->
              <li v-for="(link, i) in data.links" :key="link.label">
                <button
                  v-if="i > 0 && i < data.links.length - 1"
                  @click="goToPage(parseInt(link.label))"
                  :class="[
                    'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500',
                    link.active ? 'text-white bg-pink-500' : 'bg-white text-pink-500 hover:bg-pink-50 cursor-pointer',
                  ]"
                >
                  {{ link.label }}
                </button>
              </li>

              <!-- Next button -->
              <li>
                <button
                  @click="goToNext"
                  :disabled="!data.next_page_url"
                  :class="[
                    'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500',
                    data.next_page_url
                      ? 'bg-white text-pink-500 hover:bg-pink-50 cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed',
                  ]"
                >
                  <i class="fas fa-chevron-right -mr-px"></i>
                </button>
              </li>
            </ul>
          </nav>

          <!-- Pagination info -->
          <div class="text-sm text-gray-600 mt-2">
            Menampilkan {{ data.from }} sampai {{ data.to }} dari {{ data.total }} data
          </div>
        </div>
      </div>
      <Modal store="usage" ref="modal" @deleted="onDeleted" @failed="onFailed" />
    </div>
  </div>
</template>

<style scoped></style>
