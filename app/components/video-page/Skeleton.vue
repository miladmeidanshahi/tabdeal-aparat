<template>
  <USkeleton class="aspect-video" />

  <div class="mt-8">
    <USkeleton class="h-8 w-xs" />

    <div class="flex items-center justify-between mt-5 mb-6">
      <div class="flex items-center gap-2">
        <USkeleton class="w-8 h-8 rounded-full" />
        <div class="space-y-2">
          <USkeleton class="w-40 h-5" />
          <USkeleton class="w-30 h-5" />
        </div>
      </div>

      <USkeleton class="w-20 h-9" />
    </div>

    <div class="flex gap-4">
      <USkeleton class="w-20 h-5" />
      <USkeleton class="w-20 h-5" />
      <USkeleton class="w-20 h-5" />
    </div>

    <div class="space-y-5 mt-5">
      <USkeleton
        v-for="i in 5"
        :key="i"
        class="w-full h-5"
      />
    </div>
  </div>
</template>
