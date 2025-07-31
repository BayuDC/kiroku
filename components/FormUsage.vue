<script setup lang="ts">
defineProps<{
  freeze?: boolean;
}>();

defineEmits<{
  (e: 'save'): void;
}>();

const usage = useUsageStore();

const search = ref('');
const searchThrottled = ref('');

const { data } = await useApi<{ id: number; name: string; stock: number }[]>(`/consumables`, {
  key: 'consumables',
  default: () => [],
  query: { search: searchThrottled, limit: 3 },
});

watchThrottled(
  search,
  async () => {
    if (search.value.length < 3) {
      searchThrottled.value = '';
      return;
    }

    searchThrottled.value = search.value;
  },
  { throttle: 1000 }
);

function addItem(id: number, name: string, quantity: number, stock: number) {
  const existingItem = usage.data.consumables.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    usage.data.consumables.push({ id, name, quantity, stock });
  }
}

function removeItem(index: number) {
  usage.data.consumables.splice(index, 1);
}

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
  <Form path="/usages" @save="$emit('save')" :freeze="freeze">
    <div class="w-full">
      <Input v-model="usage.data.used_by" label="Pemakai" :error="usage.error.used_by" :disabled="freeze" />
    </div>
    <div class="w-full">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">Barang</label>

        <div v-if="usage.data.consumables.length" class="mb-2">
          <ul class="flex flex-col gap-3 mb-4">
            <li class="flex gap-1" v-for="(item, index) in usage.data.consumables" :key="index">
              <div
                class="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              >
                {{ item.name }} (Stok: {{ item.stock }})
              </div>
              <input
                class="w-20 text-center border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                v-model.number="item.quantity"
                type="number"
                :min="1"
                :max="item.stock"
                :disabled="freeze"
              />
              <button
                v-if="!freeze"
                class="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-2 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                @click="removeItem(index)"
              >
                Hapus
              </button>
            </li>
          </ul>
        </div>

        <template v-if="!freeze">
          <input
            type="text"
            placeholder="Cari barang..."
            class="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
            v-model="search"
          />
          <label
            v-if="usage.error.consumables"
            class="block text-blueGray-600 text-xs font-medium mb-2 mt-1 text-red-500"
            htmlfor="grid-password"
          >
            {{ usage.error.consumables }}
          </label>
          <div v-if="searchThrottled" class="mt-2">
            <div v-if="data.length" v-for="c in data" class="flex items-center py-1 gap-2">
              <button
                class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                @click="addItem(c.id, c.name, 1, c.stock)"
              >
                Tambah
              </button>
              <span class="text-sm font-bold text-gray-500">{{ c.name }}</span>
              <span class="text-sm px-2 py-1 rounded bg-blue-100 text-blue-600"> Stok: {{ c.stock }} </span>
            </div>
            <div v-else>Tidak ada barang ditemukan</div>
          </div>
        </template>
      </div>
    </div>

    <template v-if="freeze">
      <div class="w-full">
        <Input :model-value="formatDate(usage.data.date)" label="Tanggal" :disabled="freeze" />
      </div>
      <div class="w-full">
        <Input :model-value="usage.data.staff" label="Petugas" :disabled="freeze" />
      </div>
    </template>
    <div class="mt-4 flex gap-2" v-if="freeze">
      <NuxtLink
        to="/usages"
        class="bg-gray-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
      >
        Kembali
      </NuxtLink>
    </div>
  </Form>
</template>

<style scoped></style>
