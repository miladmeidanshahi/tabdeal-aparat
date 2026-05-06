export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: nuxtApp.$config.public.apiBase
  })

  return {
    provide: {
      api
    }
  }
})
