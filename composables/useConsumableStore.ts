interface Consumable {
  id: number;
  name: string;
  stock: number;
  description: string;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
}

export const useConsumableStore = defineStore('consumable', () => {
  const id = ref(0);

  const data = ref({
    name: '',
    stock: 0,
    description: '',
    category_id: 0,
  });
  const error = ref({
    name: '',
    stock: '',
    description: '',
    category_id: '',
  });

  async function load(_id?: number): Promise<void> {
    if (_id) id.value = _id;
    else if (!id.value) return;

    const result = await useApi<Consumable>(`/consumables/${id.value}`, {});

    if (result.data.value) {
      data.value.name = result.data.value?.name;
      data.value.stock = result.data.value?.stock;
      data.value.description = result.data.value?.description;
      data.value.category_id = result.data.value?.category_id;
      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/consumables', toValue(data));

    if (err) {
      error.value.name = err.name?.[0] || '';
      error.value.stock = err.stock?.[0] || '';
      error.value.description = err.description?.[0] || '';
      error.value.category_id = err.category_id?.[0] || '';
      return false;
    }

    error.value.name = '';
    error.value.stock = '';
    error.value.description = '';
    error.value.category_id = '';
    return true;
  }

  async function update(): Promise<boolean> {
    const err = await useApiUpdate(`/consumables/${id.value}`, toValue(data));
    if (err) {
      error.value.name = err.name?.[0] || '';
      error.value.stock = err.stock?.[0] || '';
      error.value.description = err.description?.[0] || '';
      error.value.category_id = err.category_id?.[0] || '';
      return false;
    }

    error.value.name = '';
    error.value.stock = '';
    error.value.description = '';
    error.value.category_id = '';
    return true;
  }
  async function destroy(): Promise<boolean> {
    const err = await useApiDelete(`/consumables/${id.value}`);
    if (err) {
      return false;
    }
    return true;
  }

  function reset() {
    id.value = 0;
    data.value.name = '';
    data.value.stock = 0;
    data.value.description = '';
    data.value.category_id = 0;
    error.value.name = '';
    error.value.stock = '';
    error.value.description = '';
    error.value.category_id = '';
  }

  return { id, data, error, load, create, update, delete: destroy, reset };
});
