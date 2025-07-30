<script setup lang="ts">
import type { Dialog } from '#components';

const props = defineProps<{
  store: string;
}>();

const emit = defineEmits<{
  (e: 'deleted'): void;
  (e: 'failed'): void;
}>();

const store = getStore(props.store);
const label = ref<string>('');

const dialog = ref<InstanceType<typeof Dialog> | null>(null);

async function onConfirm() {
  if (await store.delete()) {
    store.reset();
    dialog.value?.close();
    emit('deleted');
    return;
  }
  emit('failed');
}
function onCancel() {
  store.reset();
  dialog.value?.close();
}

function select(id: number, text: string) {
  store.id = id;
  label.value = text;
  dialog.value?.open();
}

defineExpose({ select });
</script>

<template>
  <Dialog ref="dialog" @confirm="onConfirm" @cancel="onCancel">
    <p class="text-blueGray-500 leading-relaxed">
      Anda yakin akan menghapus
      <span class="font-bold">{{ label }}</span>
      ?
    </p>
  </Dialog>
</template>

<style scoped></style>
