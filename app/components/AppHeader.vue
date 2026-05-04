<template>
  <UHeader class="h-fit bg-linear-[90deg,#2C2E30_-0.76%,#0E0E0E_50%] py-6 border-0">
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-11 shrink-0" />
      </NuxtLink>
    </template>

    <template #bottom>
      <UContainer>
        <div class="flex gap-4 align-center bg-neutral p-4 rounded-md mt-7">
          <UInput
            class="bg-[#3B3D3F] h-12 rounded-sm flex-1"
            variant="none"
            placeholder="جستجو ویدیو..."
          />

          <UButton
            icon="clarity:search-line"
            label="جستجو"
            class="h-12 rounded-sm px-4"
          />
        </div>
      </UContainer>
    </template>
  </UHeader>
</template>
