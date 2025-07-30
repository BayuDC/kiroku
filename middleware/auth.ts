export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  const auth = useAuthStore();

  if (nuxtApp.isHydrating || to.path !== from.path) {
    if (!(await auth.sync())) {
      return navigateTo('/login');
    }
  }
});
