export const useAlertStore = defineStore('alert', () => {
  const message = ref<string | null>(null);
  const type = ref<'success' | 'error'>('success');

  return {
    message,
    type,
  };
});

export const setAlert = (msg: string, type: 'success' | 'error') => {
  const store = useAlertStore();
  store.message = msg;
  store.type = type;

  setTimeout(() => {
    store.message = null;
  }, 5000);
};
