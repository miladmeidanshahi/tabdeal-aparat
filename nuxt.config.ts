// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', 'dayjs-nuxt'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/api/**': {
      proxy: 'https://www.aparat.com/etc/api/**'
    },
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      tooling: true,
      autoInit: true,
      stylistic: {
        commaDangle: 'never',
        indent: 2,
        quotes: 'single',
        semi: false
      }
    }
  },

  fonts: {
    provider: 'local',
    families: [
      {
        name: 'IRANSansXV',
        src: [
          { url: '/fonts/IRANSansXV.woff2', format: 'woff2' },
          { url: '/fonts/IRANSansXV.woff', format: 'woff' }
        ],
        weight: '100 1000',
        style: 'normal',
        global: true
      }
    ]
  },

  dayjs: {
    locales: ['en', 'fa'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'fa',
    defaultTimezone: 'Asia/Tehran',
    externalPlugins: [
      {
        name: 'jalaliPluginDayjs',
        package: 'jalali-plugin-dayjs'
      }
    ]
  }
})