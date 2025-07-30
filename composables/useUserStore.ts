interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}

export const useUserStore = defineStore('user', () => {
  const id = ref(0);

  const data = ref({
    name: '',
    username: '',
    password: '',
  });
  const error = ref({
    name: '',
    username: '',
    password: '',
  });

  async function load(_id?: number): Promise<void> {
    if (_id) id.value = _id;
    else if (!id.value) return;

    const result = await useApi<User>(`/users/${id.value}`, {});

    if (result.data.value) {
      data.value.name = result.data.value?.name;
      data.value.username = result.data.value?.username;
      // Don't load password for security reasons
      data.value.password = '';
      return;
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  async function create(): Promise<boolean> {
    const err = await useApiCreate('/users', toValue(data));

    if (err) {
      error.value.name = err.name?.[0] || '';
      error.value.username = err.username?.[0] || '';
      error.value.password = err.password?.[0] || '';
      return false;
    }

    error.value.name = '';
    error.value.username = '';
    error.value.password = '';
    return true;
  }

  async function update(): Promise<boolean> {
    const updateData: Record<string, any> = { ...toValue(data) };
    // Don't send password if it's empty (keeping existing password)
    if (!updateData.password) {
      delete updateData.password;
    }

    const err = await useApiUpdate(`/users/${id.value}`, updateData);
    if (err) {
      error.value.name = err.name?.[0] || '';
      error.value.username = err.username?.[0] || '';
      error.value.password = err.password?.[0] || '';
      return false;
    }

    error.value.name = '';
    error.value.username = '';
    error.value.password = '';
    return true;
  }

  async function destroy(): Promise<boolean> {
    const err = await useApiDelete(`/users/${id.value}`);
    if (err) {
      return false;
    }
    return true;
  }

  function reset() {
    id.value = 0;
    data.value.name = '';
    data.value.username = '';
    data.value.password = '';
    error.value.name = '';
    error.value.username = '';
    error.value.password = '';
  }

  return { id, data, error, load, create, update, delete: destroy, reset };
});
