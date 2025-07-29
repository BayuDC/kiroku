<script setup lang="ts">
definePageMeta({
  layout: 'empty',
});

const auth = useAuthStore();

onMounted(async () => {
  await auth.logout();
  navigateTo('/login');
});
</script>

<template>
  <Html>
    <Body class="bg-blueGray-800 bg-full"></Body>
  </Html>
</template>

<style scoped></style>
