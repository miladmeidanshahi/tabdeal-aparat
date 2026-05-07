<template>
  <UPage>
    <UPageSection :ui="{ container: 'py-8 lg:py-16' }">
      <UBlogPosts class="lg:gap-y-8">
        <LazyHomePageSkeleton v-if="pending || searchStore.loading" />

        <template v-else>
          <template v-if="searchStore.searchMode">
            <HomePageVideoCard
              v-for="video in searchStore.list"
              :id="video.uid"
              :key="video.id"
              :title="video.title"
              :visit="video.visit_cnt"
              :poster="video.big_poster"
              :duration="video.duration"
              :username="video.username"
              :profile-photo="profile.pic_s"
              :create-date="video.sdate_rss"
            />
          </template>

          <template v-else>
            <HomePageVideoCard
              v-for="video in videos.videobyprofilecat"
              :id="video.uid"
              :key="video.id"
              :title="video.title"
              :visit="formatVisits(video.visit_cnt)"
              :poster="video.big_poster"
              :duration="video.duration"
              :username="video.username"
              :profile-photo="profile.pic_s"
              :create-date="video.create_date"
            />
          </template>
        </template>
      </UBlogPosts>

      <LazyHomePageEmptyResult v-if="searchStore.searchMode && !searchStore.list.length" />

      <ClientOnly v-if="!searchStore.searchMode">
        <div class="flex justify-center my-12">
          <UPagination
            v-model:page="state.page"
            :ui="{
              item: 'cursor-pointer disabled:cursor-not-allowed data-[selected=true]:cursor-default rounded-full',
              first: 'cursor-pointer text-white disabled:cursor-not-allowed',
              prev: 'cursor-pointer text-white disabled:cursor-not-allowed',
              next: 'cursor-pointer text-white disabled:cursor-not-allowed',
              last: 'cursor-pointer text-white disabled:cursor-not-allowed'
            }"
            :total="+profile.video_cnt"
            variant="link"
          />
        </div>
      </ClientOnly>
    </UPageSection>
  </UPage>
</template>

<script setup>
definePageMeta({
  searchBar: true
})

const path = useRoute().path
useHead({
  link: {
    rel: 'canonical',
    href: path
  }
})
const profile = useProfileStore()
const { searchStore } = useSearch()

const state = reactive({
  page: 1,
  perpage: 9
})

const { data: videos, pending } = await useAPI(() => API_URL.videos({ offset: (state.page - 1) * state.perpage }), {
  responseType: 'json'
})

useSeoMeta({
  title: () => profile.value.name,
  description: () => profile.value.descr,
  ogTitle: () => profile.value.name,
  ogDescription: () => profile.value.descr,
  ogImage: () => profile.value.pic_b
})
</script>
