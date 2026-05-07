<template>
  <NuxtLoadingIndicator color="#F0B90B" />

  <UApp :locale="fa_ir">
    <AppHeader />

    <NuxtPage />
  </UApp>
</template>

<script setup>
import { fa_ir } from '@nuxt/ui/locale'
</script>
