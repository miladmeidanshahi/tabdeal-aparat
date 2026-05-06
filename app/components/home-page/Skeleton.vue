<template>
  <UBlogPost
    v-for="i in 9"
    :key="i"
    :ui="{
      header: 'p-4',
      body: 'sm:p-4'
    }"
  >
    <template #header>
      <USkeleton class="w-full h-full aspect-video rounded-lg" />
    </template>

    <template #title>
      <USkeleton class="h-7 w-xs" />
    </template>

    <template #authors>
      <div>
        <div class="flex">
          <USkeleton class="h-5 w-5 rounded-full" />
          <USkeleton class="h-5 w-20 mr-1" />
        </div>

        <div class="flex mt-3">
          <USkeleton class="h-5 w-20" />

          <USkeleton class="h-5 w-20 mr-2" />
        </div>
      </div>
    </template>
  </UBlogPost>
</template>
