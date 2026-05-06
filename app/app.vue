<template>
  <NuxtLoadingIndicator color="#F0B90B" />

  <UApp :locale="fa_ir">
    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>

<script setup>
import { fa_ir } from '@nuxt/ui/locale'
</script>
