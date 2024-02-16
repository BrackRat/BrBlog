<script setup lang="ts">
import type {ArticleWithContent} from "~/server/types/article";
import {formatUnixTimestamp} from "~/composables/formatTime";

const article = ref<ArticleWithContent>()
const id = useRoute().params.id
const loading = ref(true)

async function fetchArticle() {
  try {
    const response = await useFetch(`/api/article/${id}`, {
      method: 'GET',
    })
    if (response.data.value) {
      article.value = response.data.value
      loading.value = false
    }
  } catch (error) {
    console.error('Error fetching article:', error)
  }
}

fetchArticle()

async function addViewCount() {
  await $fetch(`/api/article/read/${id}`, {
    method: 'GET',
  })
}

onMounted(() => {
  setTimeout((() => {
    addViewCount()
  }),3000)
})
</script>

<template>
  <div class="flex flex-col p-4 justify-center items-center">
    <div v-if="!loading && article">
      <div class="max-w-[1000px]">
        <div class="mb-4 h-64 l shadow overflow-hidden rounded-lg">
          <nuxt-img
              class="object-cover h-full w-full" :src="article.cover">
          </nuxt-img>
        </div>

        <div class="text-2xl font-black mb-2">
          {{ article.title}}
        </div>

        <div class="mb-2 text-gray-600">
          {{ article.desc }}
        </div>

        <div class="mb-4 flex space-x-8 text-sm  text-gray-400">
          <div>

            <div class="flex space-x-1 items-center">
              <Icon class="align-middle" name="mingcute:calendar-2-line" />
              <span class="align-middle">{{ formatUnixTimestamp(article.publishTime)  }}</span>
            </div>
          </div>
          <div class="flex justify-end col-span-3 align-middle">
            <div class="flex space-x-1 items-center">
              <Icon class="align-middle" name="mingcute:eye-2-line" />
              <span class="align-middle">{{ article.viewCount }}</span>
            </div>
          </div>

        </div>

        <div class="mb-4 h-0.5 bg-gray-200 rounded-full">
        </div>

        <div >
          <MDRender class="max-w-full" :content="article.content" />
        </div>

        <div>
          <Comment/>
        </div>
      </div>

    </div>

    <div v-else>
      Loading...
    </div>
  </div>
</template>

<style scoped>

</style>
