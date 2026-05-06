const useSearchStore = () => useState('searchStore', () => reactive({
  list: [],
  text: null,
  loading: false,
  searchMode: false
}))

export function useSearch() {
  const config = useRuntimeConfig()
  const { $api } = useNuxtApp()
  const searchStore = useSearchStore()

  function clearSearch() {
    searchStore.value.text = null
    searchStore.value.list = []
    searchStore.value.searchMode = false
  }

  async function searchRequest() {
    if (!searchStore.value.text) {
      searchStore.value.searchMode = false
      searchStore.value.list = []

      return
    }

    searchStore.value.loading = true

    try {
      const { included: data } = await $api(API_URL.search(searchStore.value.text), {
        baseURL: config.public.apiBase,
        query: {
          channel: 'tabdealplatform',
          refererRef: 'search',
          search: searchStore.value.text
        }
      })

      const mapData = data
        ? data
            .filter(({ type }) => type === 'Video')
            .map(({ attributes }) => attributes)
        : []

      searchStore.value.searchMode = true
      searchStore.value.list = mapData
    }
    catch (error) {
      console.error(error)
    }
    finally {
      searchStore.value.loading = false
    }
  }

  return {
    clearSearch,
    searchRequest,
    searchStore
  }
}
