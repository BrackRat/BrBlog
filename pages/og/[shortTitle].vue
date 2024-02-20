<script setup lang="ts">
import type {ArticleWithContent} from "~/server/types/article";
import {formatUnixTimestamp} from "~/composables/formatTime";
import {checkSupportBrowser} from "~/composables/supportCheck";

const article = ref<ArticleWithContent>()
const shortTitle = useRoute().params.shortTitle.toString()
const loading = ref(true)

async function fetchArticle() {
  loading.value = true
  try {
    const response = await useFetch(`/api/article/${shortTitle}`, {
      method: 'GET',
    })
    const { code, data } = response.data.value
    if (code === 200) {
      article.value = data

      loading.value = false
    }else{
      article.value = {
        id: -1,
        shortTitle: shortTitle,
        title: 'No Title',
        desc: 'No Desc',
        cover: 'No Cover',
        content: 'No Content',
        viewCount: -1,
        tag: 'No tag',
        createTime: 1708278685,
        publishTime: 1708278685,
        status:0
      }
      loading.value = false
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    loading.value = false
  }
}

definePageMeta({
  layout: 'empty',
  colorMode: 'dark',
})

fetchArticle()
</script>

<template>
  <div class="flex h-screen w-screen flex-col p-4 justify-center items-center font-noto-serif">
    <!-- 弥散光 -->
    <div v-if="checkSupportBrowser()" class="w-full h-full overflow-hidden absolute">
      <div
          class="top-[-200px] right-[400px] rotate-[-70deg] w-[200px] h-[900px] absolute blur-[300px] bg-primary -z-50">
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
