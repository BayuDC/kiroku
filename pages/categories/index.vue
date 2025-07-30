<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const { data, refresh } = await useApi<any[]>('/categories', {
  default: () => [],
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <Alert2 />
      <div class="w-full">
        <Table :columns="['Nama']" :path="`/categories/new`">
          <TableRow v-for="c in data" :key="c.id" :path="`/categories/${c.id}`">
            <TableCell class="font-bold">{{ c.id }}</TableCell>
            <TableCell>{{ c.name }}</TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
