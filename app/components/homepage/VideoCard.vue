<template>
  <UBlogPost
    :ui="{
      header: 'p-4',
      body: 'sm:p-4'
    }"
    to="/"
  >
    <template #header>
      <div class="relative">
        <img
          :alt="data.title"
          :src="data.big_poster"
          class="inline-full rounded-lg transform transition-transform duration-200 group-hover/blog-post:scale-101"
        >
        <UBadge
          :label="$dayjs(data.duration * 1000).utc().format(`${data.duration > 3600 ? 'HH:mm:ss' : 'mm:ss'}`)"
          class="text-md text-gray-300 font-regular rounded-full absolute bottom-0 left-0 m-4"
          color="secondary"
        />
      </div>
    </template>

    <template #title>
      <h2
        class="text-xl font-bold"
        v-text="data.title"
      />
    </template>

    <template #authors>
      <div>
        <UUser
          :ui="{
            name: 'font-normal'
          }"
          :name="data.username"
          :avatar="{
            src: 'https://static.cdn.asset.aparat.com/profile-photo/8459674-897089-m.jpg',
            icon: 'i-lucide-image',
            class: 'w-5 h-5',
            loading: 'lazy'
          }"
        />

        <div class="flex mt-3">
          <div class="font-normal">
            {{ data.visit_cnt }} بازدید
          </div>

          <span class="mx-1">-</span>

          <div class="font-normal">
            {{ $dayjs(data.create_date).calendar('gregory').locale('fa').fromNow() }}
          </div>
        </div>
      </div>
    </template>
  </UBlogPost>
</template>

<script setup>
const { data } = defineProps({
  data: Object
})
</script>
