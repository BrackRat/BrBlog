<script setup lang="ts">
import type {Article} from "~/server/types/article";
import {checkSupportBrowser} from "~/composables/supportCheck";
import ElegantTitle from "~/components/ElegantTitle.vue";

const loading = ref(true)

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
      return true
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return false
  }
  return false
}


function generateReverse(index: number) {
  return index % 2 === 0 ? 'false' : 'true';
}

fetchArticles()
</script>

<template>
  <div class="flex flex-col transition-all">
    <div class="pb-32">

      <div >
        <!-- 弥散光 -->
        <div v-if="checkSupportBrowser()" class="w-full h-full overflow-hidden absolute">
          <div
              class="top-[-300px] left-[800px] rotate-[-45deg] w-[200px] h-[620px] blur-[200px] absolute  bg-primary -z-50">
          </div>
        </div>

        <div>
          <div class="flex pt-24 relative flex-col justify-center items-center w-full">

            <ElegantTitle text="BLOGS" />

            <div v-if="loading" class=" animate-pulse">
              <BlogCardClassicSkeleton v-for="item in [1,2,3]" />
            </div>

            <div v-else v-for="(item, index) in articles" :key="index">
              <BlogCardClassic class="space-y-96" :article="item" :reverse="generateReverse(index)"/>
            </div>

          </div>
        </div>


      </div>

    </div>

  </div>
</template>

<style scoped>

</style>