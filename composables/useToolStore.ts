interface Tool {
  id: number;
  name: string;
  category_id: number;
  status: string;
  condition: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
}

export const useToolStore = defineStore('tool', () => {
  const id = ref(0);

  const data = ref({
    name: '',
    category_id: 0,
    condition: '',
    description: '',
  });
  const error = ref({
    name: '',
    category_id: '',
    condition: '',
    description: '',
  });

  async function load(_id?: number): Promise<void> {
    if (_id) id.value = _id;
    else if (!id.value) return;

    const result = await useApi<Tool>(`/tools/${id.value}`, {});

    if (result.data.value) {
      data.value.name = result.data.value?.name;
      data.value.category_id = result.data.value?.category_id;
      data.value.condition = result.data.value?.condition;
      data.value.description = result.data.value?.description;
      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/tools', toValue(data));

    if (err) {
      error.value.name = err.name?.[0] || '';
      error.value.category_id = err.category_id?.[0] || '';
      error.value.condition = err.condition?.[0] || '';
      error.value.description = err.description?.[0] || '';
      return false;
    }

    error.value.name = '';
    error.value.category_id = '';
    error.value.condition = '';
    error.value.description = '';
    return true;
  }

  async function update(): Promise<boolean> {
    const err = await useApiUpdate(`/tools/${id.value}`, toValue(data));
    if (err) {
      error.value.name = err.name?.[0] || '';
      error.value.category_id = err.category_id?.[0] || '';
      error.value.condition = err.condition?.[0] || '';
      error.value.description = err.description?.[0] || '';
      return false;
    }

    error.value.name = '';
    error.value.category_id = '';
    error.value.condition = '';
    error.value.description = '';
    return true;
  }

  async function destroy(): Promise<boolean> {
    const err = await useApiDelete(`/tools/${id.value}`);
    if (err) {
      return false;
    }
    return true;
  }

  function reset() {
    id.value = 0;
    data.value.name = '';
    data.value.category_id = 0;
    data.value.condition = '';
    data.value.description = '';
    error.value.name = '';
    error.value.category_id = '';
    error.value.condition = '';
    error.value.description = '';
  }

  return { id, data, error, load, create, update, delete: destroy, reset };
});
