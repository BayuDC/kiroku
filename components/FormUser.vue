<script setup lang="ts">
defineEmits<{
  (e: 'save'): void;
}>();

const user = useUserStore();
</script>

<template>
  <Form path="/users" @save="$emit('save')">
    <div class="w-full">
      <Input v-model="user.data.name" label="Nama" :error="user.error.name" />
    </div>
    <div class="w-full">
      <Input v-model="user.data.username" label="Username" :error="user.error.username" />
    </div>
    <div class="w-full">
      <Input v-model="user.data.password" label="Password" type="password" :error="user.error.password" />
    </div>
  </Form>
</template>

<style scoped></style>
