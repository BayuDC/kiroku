export default defineNuxtRouteMiddleware((to, from) => {
  if (!useGate('admin')) {
    return abortNavigation({
      statusCode: 403,
      statusMessage: 'Forbidden',
    });
  }
});
