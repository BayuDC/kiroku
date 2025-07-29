import { useFetch } from '#app';
type useFetchType = typeof useFetch;

const useApi: useFetchType = (path, options) => {
  const config = useRuntimeConfig();
  const token = localStorage.getItem('token');

  return useFetch(path, {
    baseURL: config.public.apiUrl,
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    ...options,
  });
};

export default useApi;
