// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Kiroku',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#000000' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css' },
        { rel: 'stylesheet', href: '/notus/vendor/@fortawesome/fontawesome-free/css/all.min.css' },
        { rel: 'stylesheet', href: '/notus/styles/tailwind.css' },
      ],
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js' },
        { src: 'https://unpkg.com/@popperjs/core@2/dist/umd/popper.js' },
        { src: '/notus/main.js' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:8000/api',
    },
  },
  routeRules: {
    '/**': { ssr: false },
  },
});