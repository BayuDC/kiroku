interface Loan {
  id: number;
  used_by: string;
  loan_date: string;
  return_date: string | null;
  staff_id: number;
  tools_count: number;
  created_at: string;
  updated_at: string;
  staff: {
    id: number;
    name: string;
    username: string;
    role: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
  tools?: {
    id: number;
    name: string;
    pivot: {
      condition_before: string;
      condition_after: string;
    };
  }[];
}

export const useLoanStore = defineStore('loan', () => {
  const id = ref(0);

  const data = ref({
    used_by: '',
    tools: [] as { id: number; name: string; condition_before: string; condition_after: string }[],
    loan_date: '',
    return_date: null as string | null,
    staff: '',
  });
  const error = ref({
    used_by: '',
    tools: '',
  });

  async function load(_id?: number): Promise<void> {
    if (_id) id.value = _id;
    else if (!id.value) return;

    const result = await useApi<Loan>(`/loans/${id.value}`, {});

    if (result.data.value) {
      data.value.used_by = result.data.value?.used_by;
      data.value.tools = (result.data.value?.tools || []).map(tool => ({
        id: tool.id,
        name: tool.name,
        condition_before: tool.pivot.condition_before,
        condition_after: tool.pivot.condition_after || tool.pivot.condition_before,
      }));
      data.value.loan_date = result.data.value?.loan_date;
      data.value.return_date = result.data.value?.return_date;
      data.value.staff = result.data.value?.staff?.name || '';
      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function destroy(): Promise<boolean> {
    const err = await useApiDelete(`/loans/${id.value}`);
    if (err) {
      return false;
    }
    return true;
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/loans', toValue(data));

    if (err) {
      error.value.used_by = err.used_by?.[0] || '';
      error.value.tools = err.tools?.[0] || '';
      return false;
    }

    error.value.used_by = '';
    error.value.tools = '';
    return true;
  }

  async function update(): Promise<boolean> {
    const err = await useApiUpdate(`/loans/${id.value}`, toValue(data));
    if (err) {
      error.value.used_by = err.used_by?.[0] || '';
      error.value.tools = err.tools?.[0] || '';
      return false;
    }

    error.value.used_by = '';
    error.value.tools = '';
    return true;
  }

  function reset() {
    id.value = 0;
    data.value.used_by = '';
    data.value.tools = [];
    data.value.loan_date = '';
    data.value.return_date = null;
    error.value.used_by = '';
    error.value.tools = '';
  }

  return { id, data, error, load, create, update, delete: destroy, reset };
});
