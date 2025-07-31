<script setup lang="ts">
defineProps<{
  freeze?: boolean;
}>();

defineEmits<{
  (e: 'save'): void;
}>();

const loan = useLoanStore();

const search = ref('');
const searchThrottled = ref('');

const { data } = await useApi<{ id: number; name: string; status: string; condition: string }[]>(`/tools`, {
  key: 'tools',
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

function addItem(id: number, name: string, condition: string) {
  const existingItem = loan.data.tools.find(item => item.id === id);

  if (!existingItem) {
    loan.data.tools.push({
      id,
      name,
      condition_before: condition,
      condition_after: condition,
    });
  }
}

function removeItem(index: number) {
  loan.data.tools.splice(index, 1);
}
</script>

<template>
  <Form path="/loans" @save="$emit('save')" :freeze="freeze">
    <div class="w-full">
      <Input v-model="loan.data.used_by" label="Peminjam" :error="loan.error.used_by" :disabled="freeze" />
    </div>
    <div class="w-full">
      <div class="relative w-full mb-3">
        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">Alat</label>

        <div v-if="loan.data.tools.length" class="mb-2">
          <ul class="flex flex-col gap-3 mb-4">
            <li class="flex gap-1" v-for="(item, index) in loan.data.tools" :key="index">
              <div
                class="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              >
                {{ item.name }} (Kondisi: {{ item.condition_before }})
              </div>
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
            placeholder="Cari alat..."
            class="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
            v-model="search"
          />
          <label
            v-if="loan.error.tools"
            class="block text-blueGray-600 text-xs font-medium mb-2 mt-1 text-red-500"
            htmlfor="grid-password"
          >
            {{ loan.error.tools }}
          </label>
          <div v-if="searchThrottled" class="mt-2">
            <div v-if="data.length" v-for="tool in data" class="flex items-center py-1 gap-2">
              <button
                type="button"
                @click="addItem(tool.id, tool.name, tool.condition)"
                :disabled="tool.status !== 'available'"
                :class="{
                  'bg-indigo-500 text-white active:bg-indigo-600 hover:bg-indigo-600': tool.status === 'available',
                  'bg-gray-400 text-gray-200 cursor-not-allowed': tool.status !== 'available',
                }"
                class="text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                Tambah
              </button>
              <span class="text-sm font-bold text-gray-500">{{ tool.name }}</span>
              <span
                class="text-sm px-2 py-1 rounded"
                :class="{
                  'bg-green-100 text-green-600': tool.status === 'available',
                  'bg-red-100 text-red-600': tool.status !== 'available',
                }"
              >
                {{ tool.status === 'available' ? 'Tersedia' : 'Tidak Tersedia' }}
              </span>
              <span
                class="text-sm px-2 py-1 rounded"
                :class="{
                  'bg-blue-100 text-blue-600': tool.condition === 'good',
                  'bg-orange-100 text-orange-600': tool.condition === 'broken',
                }"
              >
                {{ tool.condition === 'good' ? 'Baik' : 'Rusak' }}
              </span>
            </div>
            <div v-else>Tidak ada alat ditemukan</div>
          </div>
        </template>
      </div>
    </div>

    <div class="mt-4 flex gap-2" v-if="freeze">
      <NuxtLink
        to="/loans"
        class="bg-gray-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
      >
        Kembali
      </NuxtLink>
    </div>
  </Form>
</template>

<style scoped></style>
