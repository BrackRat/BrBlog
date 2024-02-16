<script setup lang="ts">
import type {Article} from "~/server/types/article";

const loading = ref(true)

const articles = ref<Article[]>()

async function fetchArticles() {
  try {
    const response = await useFetch(`/api/article`, {
      method: 'GET',
    })
    if (response.data.value) {
      articles.value = response.data.value
      articles.value = articles.value.sort((a, b) => b.id - a.id);
      loading.value = false
    }
  } catch (error) {
    console.error('Error fetching article:', error)
  }
}

fetchArticles()
</script>

<template>
  <div class=" flex flex-col p-4">
    <div v-if="loading">
      Loading...
    </div>
    <div class="p-2 w-auto grid place-self-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-visible">
      <div v-for="item in articles">
        <BlogCard :article="item"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>