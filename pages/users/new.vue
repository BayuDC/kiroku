<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'gate-admin'],
});
setTitle('Tambah User');

const user = useUserStore();

async function onSave() {
  if (await user.create()) {
    setAlert('User berhasil ditambahkan', 'success');
    await navigateTo('/users');
  }
}

onUnmounted(() => {
  user.reset();
});
</script>

<template>
  <div class="px-4 md:px-10 mx-auto w-full -m-24">
    <div class="flex flex-wrap px-4">
      <div class="w-full">
        <FormUser @save="onSave" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
