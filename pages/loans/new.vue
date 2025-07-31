<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
setTitle('Tambah Peminjaman');

const loan = useLoanStore();

async function onSave() {
  if (await loan.create()) {
    setAlert('Peminjaman berhasil ditambahkan', 'success');
    await navigateTo('/loans');
  } else {
    setAlert('Gagal menambahkan peminjaman', 'error');
  }
}

onUnmounted(() => {
  loan.reset();
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <div class="max-w-screen-sm w-full">
        <Alert2 />
      </div>
      <div class="w-full">
        <FormLoan @save="onSave" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
