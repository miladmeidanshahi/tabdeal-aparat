<template>
  <UHeader
    class="h-fit bg-linear-[90deg,#2C2E30_-0.76%,#0E0E0E_50%] py-3 md:py-6 border-0"
  >
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-8 md:h-11 shrink-0" />
      </NuxtLink>
    </template>

    <template #toggle>
      <div />
    </template>

    <template
      v-if="$route.meta.searchBar"
      #bottom
    >
      <UContainer>
        <div class="flex gap-4 align-center bg-neutral p-4 rounded-md mt-7">
          <UInput
            v-model="searchStore.text"
            :ui="{ trailing: 'pe-1' }"
            class="bg-[#3B3D3F] h-12 rounded-sm flex-1"
            variant="none"
            clearable
            :loading="searchStore.loading"
            aria-label="Clear input"
            placeholder="جستجو ویدیو..."
            @keydown.enter="searchRequest"
          >
            <template
              v-if="searchStore.text?.length"
              #trailing
            >
              <UButton
                color="primary"
                variant="link"
                size="md"
                icon="lucide:x"
                aria-label="Clear input"
                @click="clearSearch"
              />
            </template>
          </UInput>

          <UButton
            icon="clarity:search-line"
            label="جستجو"
            class="h-12 rounded-sm px-4"
            @click="searchRequest"
          />
        </div>
      </UContainer>
    </template>
  </UHeader>
</template>

<script setup>
const { searchRequest, clearSearch, searchStore } = useSearch()
</script>
