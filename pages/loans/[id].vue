<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
setTitle('Detail Peminjaman');

const route = useRoute();
const id = route.params.id as string;

const loan = useLoanStore();
await loan.load(parseInt(id));

onUnmounted(() => {
  loan.reset();
});

async function onSave() {
  if (await loan.update()) {
    setAlert('Peminjaman berhasil diperbarui', 'success');

    await loan.load(parseInt(id));
  } else {
    setAlert('Gagal memperbarui peminjaman', 'error');
  }
}
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <div class="max-w-screen-sm w-full">
        <Alert2 />
      </div>
      <div class="w-full">
        <FormLoan freeze :freeze2="!loan.data.return_date" @save="onSave" />
        {{ loan.data }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
