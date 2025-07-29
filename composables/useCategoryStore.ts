export const useCategoryStore = defineStore('category', () => {
  const id = ref(0);

  const data = ref({
    name: '',
  });
  const error = ref({
    name: '',
  });

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/categories', toValue(data));

    if (err) {
      error.value.name = err.name[0];
      return false;
    }

    error.value.name = '';
    return true;
  }

  function reset() {
    id.value = 0;
    data.value.name = '';
    error.value.name = '';
  }

  return { id, data, error, create, reset };
});
