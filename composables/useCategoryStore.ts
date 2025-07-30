interface Category {
  id: number;
  name: string;
}

export const useCategoryStore = defineStore('category', () => {
  const id = ref(0);

  const data = ref({
    name: '',
  });
  const error = ref({
    name: '',
  });

  async function load(_id?: number): Promise<void> {
    if (_id) id.value = _id;
    else if (!id.value) return;

    const result = await useApi<Category>(`/categories/${id.value}`, {});

    if (result.data.value) {
      data.value.name = result.data.value?.name;
      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }
  async function create(): Promise<boolean> {
    const err = await useApiCreate('/categories', toValue(data));

    if (err) {
      error.value.name = err.name[0];
      return false;
    }

    error.value.name = '';
    return true;
  }

  async function update(): Promise<boolean> {
    const err = await useApiUpdate(`/categories/${id.value}`, toValue(data));
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

  return { id, data, error, load, create, update, reset };
});
