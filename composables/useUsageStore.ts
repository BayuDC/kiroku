interface Usage {
  id: number;
  used_by: string;
  date: string;
  staff_id: number;
  consumables_count: number;
  staff: {
    id: number;
    name: string;
    username: string;
    role: string;
  };
  consumables: {
    id: number;
    name: string;
    stock: number;
    pivot: {
      quantity: number; // Ensure quantity is defined
    };
  }[];
}

export const useUsageStore = defineStore('usage', () => {
  const id = ref(0);

  const data = ref({
    used_by: '',
    consumables: [] as { id: number; name: string; quantity: number; stock: number }[],
    date: '',
    staff: '',
  });
  const error = ref({
    used_by: '',
    consumables: '',
  });

  async function load(_id?: number): Promise<void> {
    if (_id) id.value = _id;
    else if (!id.value) return;

    const result = await useApi<Usage>(`/usages/${id.value}`, {});

    if (result.data.value) {
      data.value.used_by = result.data.value?.used_by;
      data.value.consumables = result.data.value?.consumables || [];

      data.value.consumables.forEach(item => {
        item.quantity = item.pivot.quantity; // Ensure quantity is defined
      });

      data.value.date = result.data.value?.date;
      data.value.staff = result.data.value?.staff.name || '';
      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/usages', toValue(data));

    if (err) {
      error.value.used_by = err.used_by?.[0] || '';
      error.value.consumables = err.consumables?.[0] || '';
      return false;
    }

    error.value.used_by = '';
    error.value.consumables = '';
    return true;
  }

  async function destroy(): Promise<boolean> {
    const err = await useApiDelete(`/usages/${id.value}`);
    if (err) {
      return false;
    }
    return true;
  }

  function reset() {
    id.value = 0;
    data.value.used_by = '';
    data.value.consumables = [];
    error.value.used_by = '';
    error.value.consumables = '';
  }

  return { id, data, error, load, create, delete: destroy, reset };
});
