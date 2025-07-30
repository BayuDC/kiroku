<script setup lang="ts">
defineEmits<{
  (e: 'save'): void;
}>();

const consumable = useConsumableStore();

const { data } = await useApi<{ id: number; name: string }[]>(`/categories`, {
  key: 'categories',
  default: () => [],
});
</script>

<template>
  <Form path="/consumables" @save="$emit('save')">
    <div class="w-full">
      <Input v-model="consumable.data.name" label="Nama" :error="consumable.error.name" />
    </div>
    <div class="w-full">
      <Input v-model.number="consumable.data.stock" label="Stok" type="number" :error="consumable.error.stock" />
    </div>
    <div class="w-full">
      <Input v-model="consumable.data.description" label="Deskripsi" :error="consumable.error.description" />
    </div>

    <div class="w-full">
      <Select
        label="Kategori"
        :options="data"
        :error="consumable.error.category_id"
        v-model="consumable.data.category_id"
      >
      </Select>
    </div>
  </Form>
</template>

<style scoped></style>
