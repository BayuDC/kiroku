interface User {
  id: number;
  name: string;
  username: string;
  role: 'admin' | 'staff';
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const config = useRuntimeConfig();

  async function sync() {
    const token = localStorage.getItem('token');
    if (!token) {
      user.value = null;
      return false;
    }
    try {
      loading.value = true;
      const data = await $fetch<{ user: User }>('/auth/info', {
        baseURL: config.public.apiUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      user.value = data.user;
      return true;
    } catch (error) {
      user.value = null;
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function login(username: string, password: string) {
    try {
      loading.value = true;
      const data = await $fetch<{ token: string; message: string }>('/auth/login', {
        baseURL: config.public.apiUrl,
        body: { username, password },
        method: 'post',
      });
      localStorage.setItem('token', data!.token);
      return {
        error: false,
        message: data!.message,
      };
    } catch (error: any) {
      return {
        message: error.response._data.message,
        error: true,
      };
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      const token = localStorage.getItem('token');
      await $fetch('/auth/logout', {
        baseURL: config.public.apiUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'post',
      });
    } catch (e) {
    } finally {
      localStorage.removeItem('token');
      user.value = null;
    }
  }

  return { user, sync, login, logout, loading };
});
