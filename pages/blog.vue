<script setup lang="ts">
import type {Article} from "~/server/types/article";

const loading = ref(false)

const articles = ref<Article[]>()

async function fetchArticles() {
  loading.value = true
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


function generateReverse(index:number) {
  return index % 2 === 0 ? 'true' : 'false';
}

onMounted(() => {
  fetchArticles()
})

</script>

<template>
  <div class="flex flex-col transition-all">
    <div v-if="loading" class="w-full h-screen text-secondary pt-16 flex justify-center animate-pulse">
      <BlogCardClassicSkeleton />
    </div>

    <div v-else class="pb-32">
      <div class="w-full h-full overflow-hidden absolute">
        <div
            class="top-[-300px] left-[800px] rotate-[-45deg] w-[200px] h-[620px] blur-[200px] absolute  bg-primary -z-50">
        </div>
      </div>

      <div class="flex pt-24 relative flex-col justify-center items-center w-full">
        <div v-for="(item, index) in articles" :key="index">
          <BlogCardClassic :article="item" :reverse="generateReverse(index)" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>