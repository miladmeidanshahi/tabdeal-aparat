// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'dayjs-nuxt',
    '@nuxt/hints',
    '@vueuse/nuxt'
  ],

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', href: '/favicon-fa-ir.webp' }
      ],
      htmlAttrs: {
        lang: 'fa-IR',
        dir: 'rtl'
      }
    }
  },

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    // '/': { prerender: true },
    '/etc/api/**': {
      proxy: 'https://www.aparat.com/etc/api/**'
    },
    '/api/fa/v1/**': {
      proxy: 'https://www.aparat.com/api/fa/v1/**'
    }
  },

  compatibilityDate: '2025-01-15',

  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },

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
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'dayjs', // CJS
        'dayjs/plugin/updateLocale', // CJS
        'dayjs/locale/en', // CJS
        'dayjs/locale/fa', // CJS
        'dayjs/plugin/relativeTime', // CJS
        'dayjs/plugin/utc', // CJS
        'dayjs/plugin/timezone', // CJS
        'jalali-plugin-dayjs',
      ]
    }
  },

  icon: {
    // provider: 'server',
    localApiEndpoint: '/_nuxt_icon',
    // serverBundle: {
    //   collections: ['fa7-solid', 'mdi', 'lucide', 'svg-spinners']
    // }
  }
})