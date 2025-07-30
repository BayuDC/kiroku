const useApiUpdate = async (path: string, body: Record<string, any>): Promise<Record<string, string> | null> => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token');

  const alert = useAlertStore();

  try {
    const data = await $fetch(path, {
      baseURL: config.public.apiUrl,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body,
    });

    return null;
  } catch (error: any) {
    if (error.response._data.errors) {
      return error.response._data.errors;
    }

    return error.data;
  }
};

export default useApiUpdate;
