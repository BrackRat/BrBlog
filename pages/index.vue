<script setup lang="ts">
import {useBlogStore} from "~/stores/blog";
import httpRequest from "~/service";
import type {Article} from "~/server/types/article";

const blogStore = useBlogStore()

const loading = ref(false)

function test(){
  blogStore.articlePublishTest()
}


const articles = ref<Article[]>()

function preloadArticles() {
  const response = useFetch("/api/article", {
    method: 'GET',
  })
  if(response.data.value?.length && response.data.value?.length > 0){
    articles.value = response.data.value
  }
}

preloadArticles()
</script>

<template>
  <div class="flex flex-col justify-center">

    <p>home page</p>
    <button @click="preloadArticles" class="p-4">
      Test
    </button>
    <div v-if="!loading" class="flex flex-col p-4">
        <div class="p-2 w-auto grid place-self-center  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 overflow-visible" >
          <BlogCard  v-for="item in articles" :article="item"/>
        </div>

    </div>
  </div>
</template>

