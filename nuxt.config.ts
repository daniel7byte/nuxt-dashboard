// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  routeRules: {
    // '/**': {
    //   // Client-side rendering for all routes
    //   ssr: false,
    //   // Enable prerendering for all routes
    //   prerender: true
    // }
  },

  pages: true, // To force the pages system

  css: ['~/assets/css/main.css']
})
