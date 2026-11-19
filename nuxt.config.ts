import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    // Server-only: Laravel API origin
    apiUrl: process.env.API_URL || 'http://127.0.0.1:8000',
    public: {
      mediaUrl: process.env.NUXT_PUBLIC_MEDIA_URL || process.env.API_URL || 'http://127.0.0.1:8000',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Shikhor Academy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Shikhor Academy is a comprehensive online learning platform with expert-led courses, practical quizzes, certificates and a curated store. Learn anytime, anywhere.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  nitro: {
    routeRules: {
      '/api/**': { cors: true },
    },
  },
})
