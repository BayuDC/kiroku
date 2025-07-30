<script setup lang="ts">
defineEmits<{
  (e: 'save'): void;
}>();

const tool = useToolStore();

const { data } = await useApi<{ id: number; name: string }[]>(`/categories`, {
  key: 'categories',
  default: () => [],
});
</script>

<template>
  <Form path="/tools" @save="$emit('save')">
    <div class="w-full">
      <Input v-model="tool.data.name" label="Nama" :error="tool.error.name" />
    </div>
    <div class="w-full">
      <Select label="Kategori" :options="data" :error="tool.error.category_id" v-model="tool.data.category_id">
      </Select>
    </div>
    <div class="w-full">
      <Select
        label="Kondisi"
        :options="[
          { id: 'good', name: 'Baik' },
          { id: 'damaged', name: 'Rusak' },
        ]"
        :error="tool.error.condition"
        v-model="tool.data.condition"
      >
      </Select>
    </div>
    <div class="w-full">
      <Input v-model="tool.data.description" label="Deskripsi" :error="tool.error.description" />
    </div>
  </Form>
</template>

<style scoped></style>
