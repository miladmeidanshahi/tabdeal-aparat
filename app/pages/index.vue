<template>
  <div>
    <UPage>
      <UPageSection :ui="{ container: 'lg:py-16' }">
        <UBlogPosts class="lg:gap-y-8">
          <HomepageSkeleton v-if="pending" />

          <HomepageVideoCard
            v-for="video in videos.videobyprofilecat"
            v-else
            :key="video.id"
            :data="video"
          />
        </UBlogPosts>

        <div class="flex justify-center my-12">
          <UPagination
            v-model:page="page"
            :total="100"
            variant="link"
          />
        </div>
      </UPageSection>
    </UPage>
  </div>
</template>

<script setup>
const page = ref(1)

const { data: videos, pending } = await useFetch(() => API_URL.videos({ offset: page.value * 9 }), {
  responseType: 'json'
})

// https://www.aparat.com//etc/api/videobyprofilecat/usercat//username/tabdealplatform/perpage/9/curoffset/9
</script>
