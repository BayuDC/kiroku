<script setup lang="ts">
const alert = useAlertStore();
</script>

<template>
  <Alert v-if="alert.message" :type="alert.type" :message="alert.message" class="w-full" />
</template>

<style scoped></style>
