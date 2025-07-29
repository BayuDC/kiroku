export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  if (!(await auth.sync())) {
    return navigateTo('/login');
  }
});
