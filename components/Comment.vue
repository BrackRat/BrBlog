<script setup lang="ts">
import MyGiscus from './Giscus/MyGisgus.vue'

// const colorMode = useColorMode()

// const theme = computed(() => {
//   return colorMode.value === 'dark' ? 'dark' : 'light'
// })
</script>

<template>
  <MyGiscus
      theme="dark"
      category="Announcements"
      category-id="DIC_kwDOLTSd6M4CdRSq"
      class="py-4 pt-4"
      crossorigin="anonymous"
      emit-metadata="0"
      input-position="top"
      lang="zh-CN"
      mapping="pathname"
      reactions-enabled="1"
      repo="BrackRat/giscus"
      repo-id="R_kgDOLTSd6A"
      strict="1"
      term="Welcome to @giscus/vue component!"
  />
</template>