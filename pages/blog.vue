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

// fetchArticles()

function generateRandomRoundedClass() {
  const positions = ['tl', 'tr', 'bl', 'br'];
  const randomPosition = positions[Math.floor(Math.random() * positions.length)];
  return `rounded-${randomPosition}-[100px]`;
}

function generateRandomReverse() {
  const positions = ['true','false'];
  const random = positions[Math.floor(Math.random() * positions.length)];
  return `${random}`;
}
</script>

<template>
  <div class="flex flex-col">
    <div v-if="loading">
      Loading...
    </div>

    <div class="pb-32">
      <div class="w-full h-full overflow-hidden absolute">
        <div
            class="top-[-300px] left-[800px] rotate-[-45deg] w-[200px] h-[620px] blur-[200px] absolute  bg-primary -z-50">
        </div>
      </div>

      <div class="flex pt-24 relative flex-col justify-center items-center w-full">
        <BlogCardClassic :reverse="generateRandomReverse()" :rounded="generateRandomRoundedClass()" />
        <BlogCardClassic :reverse="generateRandomReverse()" :rounded="generateRandomRoundedClass()" />
        <BlogCardClassic :reverse="generateRandomReverse()" :rounded="generateRandomRoundedClass()" />
        <BlogCardClassic :reverse="generateRandomReverse()" :rounded="generateRandomRoundedClass()" />
      </div>
    </div>

<!--      <div v-for="item in articles">-->
<!--        <BlogCard :article="item"/>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<style scoped>

</style>