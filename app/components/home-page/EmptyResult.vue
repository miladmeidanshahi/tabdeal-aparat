<template>
  <UEmpty
    title="نتیجه ای یافت نشد"
    variant="naked"
    description="شاید چیزی که دنبالشی رو اشتباه جستجو کردی!"
    :actions="[
      {
        label: 'حذف جستجو',
        color: 'primary',
        variant: 'subtle',
        onClick: clearSearch
      }
    ]"
  >
    <template #leading>
      <UIcon
        name="lucide:search-x"
        class="size-15 text-white"
      />
    </template>
  </UEmpty>
</template>

<script setup>
const { clearSearch } = useSearch()
</script>
