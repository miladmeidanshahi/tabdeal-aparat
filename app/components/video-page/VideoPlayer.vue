<template>
  <div
    ref="video-wrapper"
    class="relative group/video flex align-center items-center"
  >
    <div class="flex-1">
      <video
        ref="video"
        class="inline-full aspect-video rounded-xl cursor-pointer bg-black"
        :poster
        @click="playToggle"
      />
    </div>

    <div class="md:opacity-0 absolute bottom-0 left-0 right-0 py-2 px-3 md:py-6 md:px-12 transition-all duration-300 group-focus/video:opacity-100 md:group-hover/video:opacity-100">
      <USlider
        v-model="currentTime"
        :max="duration"
        class="mb-4 cursor-pointer"
        :tooltip="{
          text: formatDuration(currentTime)
        }"
        inverted
        @change="playToggle"
        @update:model-value="onSeeking"
      />

      <div class="flex items-center flex-row-reverse gap-4">
        <UButton
          :icon="playing ? 'lucide:pause' : 'lucide:play'"
          variant="ghost"
          class="text-white"
          @click="playToggle"
        />

        <div class="group flex items-center flex-row-reverse gap-4">
          <UButton
            :icon="volumnIcon"
            variant="ghost"
            class="text-white"
            @click="volume = volume === 0 ? 1 : 0"
          />

          <div class="overflow-hidden transition-all duration-300 w-0 opacity-0 group-hover:w-32 group-hover:opacity-100 py-2 px-1">
            <USlider
              v-model="volume"
              :min="0"
              :step="0.001"
              :max="1"
              class="cursor-pointer w-30"
              size="xs"
              inverted
            />
          </div>
        </div>

        <div class="text-white">
          {{ formatDuration(duration) }} / {{ formatDuration(currentTime) }}
        </div>

        <div class="flex-1" />

        <UButton
          :icon="isFullscreen ? 'lucide:minimize' : 'lucide:maximize'"
          variant="ghost"
          class="text-white"
          @click="toggle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { src, poster } = defineProps({
  src: String,
  poster: String
})

const video = useTemplateRef('video')
const videoWrapper = useTemplateRef('video-wrapper')

const { isFullscreen, toggle } = useFullscreen(videoWrapper)

const { playing, currentTime, duration, volume, waiting } = useMediaControls(video, {
  src: {
    src,
    type: 'video/mp4'
  }
})

const volumnIcon = computed(() => {
  if (volume.value === 0) return 'lucide:volume-off'
  else if (volume.value >= 0.6) return 'lucide:volume-2'
  else if (volume.value <= 0.6 && volume.value >= 0.3) return 'lucide:volume-1'
  else return 'lucide:volume'
})

function formatDuration(seconds) {
  return new Date(1000 * seconds).toISOString().slice(14, 19)
}

function playToggle() {
  playing.value = !playing.value
}

function onSeeking(value) {
  playing.value = false
  currentTime.value = value
}

onMounted(() => playing.value = true)
</script>
