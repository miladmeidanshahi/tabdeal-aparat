<template>
  <div
    ref="video-wrapper"
    class="relative group/video flex align-center items-center rounded-xl overflow-hidden"
  >
    <div class="flex-1">
      <video
        ref="video"
        class="inline-full aspect-video cursor-pointer bg-black"
        :poster
        @click="playToggle"
      />
    </div>

    <div class="md:opacity-0 absolute bottom-0 left-0 right-0 py-2 px-3 md:py-6 md:px-12 transition-all duration-300 group-focus/video:opacity-100 md:group-hover/video:opacity-100 bg-linear-to-t from-secondary z-10">
      <USlider
        v-model="currentTime"
        :ui="{
          track: 'h-1 md:h-2'
        }"
        :max="duration"
        class="mb-4 cursor-pointer"
        :tooltip="{
          text: formatDuration(currentTime)
        }"
        inverted
        @change="playToggle"
        @update:model-value="onSeeking"
      />

      <div class="flex items-center flex-row-reverse gap-2 md:gap-4">
        <UButton
          :icon="playing ? 'lucide:pause' : 'lucide:play'"
          variant="ghost"
          class="text-white cursor-pointer"
          @click="playToggle"
        />

        <div class="group flex items-center flex-row-reverse gap-4">
          <UButton
            :icon="volumnIcon"
            variant="ghost"
            class="text-white cursor-pointer"
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

        <div class="text-xs md:text-base text-white">
          {{ formatDuration(duration) }} / {{ formatDuration(currentTime) }}
        </div>

        <div class="flex-1" />

        <UPopover
          :ui="{
            content: 'backdrop-blur-xl bg-secondary/50 ring-0',
            itemLabel: 'text-center'
          }"
          :portal="false"
          :content="{
            align: 'center',
            side: 'top',
            sideOffset: 10
          }"
        >
          <ClientOnly>
            <UButton
              icon="lucide:sliders-horizontal"
              variant="ghost"
              class="text-xs md:text-base text-white cursor-pointer"
              :label="state.quality"
            />
          </ClientOnly>

          <template #content>
            <div class="flex flex-col gap-2 p-2">
              <UButton
                v-for="(quality, index) in qualities"
                :key="index"
                size="xs"
                :label="quality.text"
                color="transparent"
                :active="state.quality === quality.profile"
                active-color="primary"
                class="text-white cursor-pointer"
                @click="setQuality(quality)"
              />
            </div>
          </template>
        </UPopover>

        <UButton
          :icon="isFullscreen ? 'lucide:minimize' : 'lucide:maximize'"
          variant="ghost"
          class="text-white cursor-pointer"
          @click="toggle"
        />
      </div>
    </div>

    <div
      v-show="waiting"
      class="bg-secondary/50 backdrop-blur-xs absolute inset-0 flex justify-center items-center rounded-xl"
    >
      <UIcon
        name="svg-spinners:180-ring-with-bg"
        class="size-10 md:size-20"
      />
    </div>
  </div>
</template>

<script setup>
import { breakpointsTailwind } from '@vueuse/core'

const { poster, qualities } = defineProps({
  poster: String,
  qualities: Array
})

const state = reactive({
  src: null,
  quality: '720p'
})

const qualityMap = computed(() => qualities.reduce((map, quality) => {
  map[quality.profile] = quality.urls[0]

  return map
}, {}))

const video = useTemplateRef('video')
const breakpoints = useBreakpoints(breakpointsTailwind, { ssrWidth: 768 })
const { downlink } = useNetwork()
const videoWrapper = useTemplateRef('video-wrapper')
const videoSrc = computed(() => video.value?.src[state.quality])
const { isFullscreen, toggle } = useFullscreen(videoWrapper)
const { playing, currentTime, duration, volume, waiting } = useMediaControls(video, {
  src: {
    src: videoSrc.value,
    type: 'video/mp4'
  }
})
const volumnIcon = computed(() => {
  if (volume.value === 0) return 'lucide:volume-off'
  else if (volume.value >= 0.6) return 'lucide:volume-2'
  else if (volume.value <= 0.6 && volume.value >= 0.3) return 'lucide:volume-1'
  else return 'lucide:volume'
})

const isMobile = computed(() => breakpoints.smaller('md'))

watch(downlink, (value) => {
  if (value < 2) {
    state.quality = '144p'
  }
  else if (value < 3) {
    state.quality = '360p'
  }
  else if (value < 5) {
    state.quality = '720p'
  }
  else {
    state.quality = qualities.at(-1).profile
  }
}, { immediate: true })

watch(() => state.quality, (value) => {
  setQuality({ urls: [qualityMap.value[value]], profile: value })
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

function setQuality({ urls, profile }) {
  const time = currentTime.value

  state.quality = profile
  video.value.src = urls[0]
  video.value.onloadedmetadata = () => {
    video.value.currentTime = time

    playToggle()
  }
}

onMounted(async () => {
  video.value.src = qualityMap.value[state.quality]

  playing.value = true
})
</script>
