export default defineNuxtPlugin(async () => {
  const profile = useProfileStore()

  const { data } = await useAPI(API_URL.profile, {
    transform: ({ profile }) => profile
  })

  profile.value = data.value
})
