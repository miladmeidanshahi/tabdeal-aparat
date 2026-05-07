<template>
  <UBlogPost
    :ui="{
      body: 'sm:p-4',
      title: 'text-lg md:text-xl font-bold',
      header: 'p-4'
    }"
    :to="`/${id}`"
  >
    <template #header>
      <div class="relative">
        <img
          :alt="title"
          :src="poster"
          class="inline-full aspect-video rounded-lg transform transition-transform duration-200 group-hover/blog-post:scale-101 bg-secondary"
          fetchpriority="high"
        >
        <UBadge
          :label="$dayjs(duration * 1000).utc().format(`${duration > 3600 ? 'HH:mm:ss' : 'mm:ss'}`)"
          class="text-xs md:text-base text-gray-300 font-regular rounded-full absolute bottom-0 left-0 m-4"
          color="secondary"
        />
      </div>
    </template>

    <template #title>
      <span v-html="title" />
    </template>

    <template #authors>
      <div>
        <UUser
          :ui="{
            name: 'text-sm md:text-base font-normal'
          }"
          :name="username"
          :avatar="{
            src: profilePhoto,
            icon: 'lucide:user',
            class: 'w-5 h-5',
            loading: 'lazy'
          }"
        />

        <div class="text-sm md:text-base flex mt-3">
          <div class="font-normal">
            {{ visit }} بازدید
          </div>

          <span class="mx-1">-</span>

          <div class="font-normal">
            {{ $dayjs(createDate).calendar('gregory').locale('fa').fromNow() }}
          </div>
        </div>
      </div>
    </template>
  </UBlogPost>
</template>

<script setup>
const {
  id,
  title,
  visit,
  poster,
  duration,
  username,
  profilePhoto,
  createDate
} = defineProps({
  id: String,
  title: String,
  visit: [Number, String],
  poster: String,
  duration: [Number, String],
  username: String,
  profilePhoto: String,
  createDate: String
})
</script>
