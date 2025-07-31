<script setup lang="ts">
setTitle('Edit Pengguna');
definePageMeta({
  middleware: ['auth', 'gate-admin'],
});

const route = useRoute();
const id = route.params.id as string;

const user = useUserStore();
await user.load(parseInt(id));

async function onSave() {
  if (await user.update()) {
    setAlert('User berhasil diperbarui', 'success');
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
