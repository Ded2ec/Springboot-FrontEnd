<script setup lang="ts">

  import { useTheme } from '@/composables/useTheme'

  const { loadTheme } = useTheme()

  onMounted(() => {
    loadTheme()
  })

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
