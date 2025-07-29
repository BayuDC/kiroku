<script setup lang="ts">
defineEmits<{
  (e: 'save'): void;
}>();

const category = useCategoryStore();
</script>

<template>
  <Form path="/categories" @save="$emit('save')">
    <div class="w-full">
      <Input v-model="category.data.name" label="Nama" :error="category.error.name" />
    </div>
  </Form>
</template>

<style scoped></style>
