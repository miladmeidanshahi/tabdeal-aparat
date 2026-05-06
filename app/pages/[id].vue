<template>
  <UPage>
    <UPageSection :ui="{ container: 'lg:py-16' }">
      <UCard
        :ui="{ body: 'sm:p-4' }"
        class="rounded-2xl"
      >
        <VideoPageSkeleton v-if="pending" />

        <template v-else>
          <VideoPageVideoPlayer
            :src="data.file_link"
            :quality="data.file_link_all"
            :poster="data.big_poster"
          />

          <div class="mt-8">
            <h1
              class="text-xl md:text-3xl text-white font-bold"
              v-text="data.title"
            />

            <div class="flex items-center justify-between mt-5 mb-6">
              <UUser
                to="/"
                :ui="{
                  name: 'text-xl font-light',
                  description: 'text-md font-light'
                }"
                :avatar="{
                  src: data.profilePhoto,
                  alt: data.username
                }"
                :name="data.sender_name"
                :description="`${profile.follower_cnt} دنبال کننده`"
              />

              <ClientOnly>
                <UButton
                  :ui="{
                    label: 'hidden md:block',
                    trailingIcon: 'size-5'
                  }"
                  size="xl"
                  color="error"
                  :class="`${state.hasBeenLiked ? 'bg-error-500' : 'bg-gray'} text-md text-white font-normal cursor-pointer`"
                  :label="String(state.likes)"
                  trailing-icon="lucide:heart"
                  @click="toggleLike(data.id)"
                />
              </ClientOnly>
            </div>

            <div class="flex flex-wrap mb-5">
              <span
                class="text-sm md:text-xl"
                v-text="`${data.visit_cnt} بازدید`"
              />

              <span class="mx-2">.</span>

              <span
                class="text-sm md:text-xl"
                v-text="$dayjs(data.sdate).calendar('jalali').fromNow()"
              />

              <span class="mx-2">.</span>

              <div class="flex flex-wrap gap-3">
                <nuxt-link
                  v-for="(tag, index) in data.tag_str.split(',')"
                  :key="index"
                  class="text-sm md:text-xl text-info font-normal cursor-pointer"
                  @click="onTag(tag)"
                >#{{ tag }}</nuxt-link>
              </div>
            </div>

            <p
              class="text-sm/8 md:text-lg/10 font-normal text-white whitespace-pre-line"
              v-html="data.description"
            />
          </div>
        </template>
      </UCard>
    </UPageSection>
  </UPage>
</template>

<script setup>
definePageMeta({
  searchBar: false
})

const { id } = useRoute().params
const profile = useProfileStore()
const likeStore = useLikeStorage()
const { searchRequest, searchStore } = useSearch()

const { data, pending } = await useAPI(() => API_URL.videoById(id), {
  lazy: true,
  responseType: 'json',
  transform: ({ video }) => video
})

const state = reactive({
  likes: 0,
  hasBeenLiked: false
})

watch(data, (value) => {
  if (!value) return

  state.likes = likeStore.value[value.id] || value.like_cnt
  state.hasBeenLiked = value.id in likeStore.value

  useSeoMeta({
    title: () => value.title,
    description: () => value.description,
    ogTitle: () => value.title,
    ogDescription: () => value.description,
    ogImage: () => value.small_poster
  })
}, { immediate: true })

function onTag(tag) {
  searchStore.value.text = tag

  searchRequest()

  navigateTo('/')
}

function toggleLike(id) {
  if (id in likeStore.value) {
    --state.likes
    state.hasBeenLiked = false
    delete likeStore.value[id]
  }
  else {
    ++state.likes
    state.hasBeenLiked = true
    likeStore.value[id] = state.likes
  }
}
</script>
