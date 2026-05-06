import { useStorage } from '@vueuse/core'

export const useLikeStorage = () => {
  return useStorage('likeStore', {})
}
