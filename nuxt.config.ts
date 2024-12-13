export default defineNuxtConfig({
  app: {
    baseURL: '/task-board/',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/icon'],
});
