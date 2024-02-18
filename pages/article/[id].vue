<script setup lang="ts">
import type {ArticleWithContent} from "~/server/types/article";
import {formatUnixTimestamp} from "~/composables/formatTime";
import {checkSupportBrowser} from "~/composables/supportCheck";

const article = ref<ArticleWithContent>()
const id = parseInt(useRoute().params.id.toString(),10)
const loading = ref(true)

async function fetchArticle() {
  loading.value = true
  try {
    const response = await useFetch(`/api/article/${id}`, {
      method: 'GET',
    })
    if (response.data.value) {
      article.value = response.data.value
      if (article.value === undefined) {
        article.value = {
          id: id,
          title: 'No Title',
          desc: 'No Desc',
          cover: 'No Cover',
          content: 'No Content',
          viewCount: -1,
          tag: 'No tag',
          createTime: 1708278685,
          publishTime: 1708278685,
        }
      }
      loading.value = false
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    loading.value = false
  }
}


async function addViewCount() {
  await $fetch(`/api/article/read/${id}`, {
    method: 'GET',
  })
}

onMounted(() => {

  setTimeout((() => {
    addViewCount()
  }),5000)
})


fetchArticle()
</script>

<template>
  <div class="flex flex-col p-4 justify-center items-center font-noto-serif">
    <!-- 弥散光 -->
    <div v-if="checkSupportBrowser()" class="w-full h-full overflow-hidden absolute">
      <div
          class="top-[-200px] right-[400px] rotate-[-70deg] w-[200px] h-[900px] absolute blur-[300px] bg-primary -z-50">
      </div>
    </div>

    <div class="relative" v-if="!loading">
      <div class="lg:w-[1000px]">
        <div class="pt-32 max-w-screen">
<!--          <ShadowImage  height="360px" width="1000px" rounded="rounded-tr-[100px]" :image="article.cover" shadow_x="-top-6" shadow_y="left-6" />-->
        </div>

        <div class="pt-8 text-3xl text-primary font-black mb-2">
          {{ article!.title}}
        </div>

        <div class="mb-2 text-secondary">
          {{ article!.desc }}
        </div>

        <div class="mb-4 flex space-x-8 text-sm  text-content ">
          <div>
            <div class="flex space-x-1 items-center">
              <Icon class="align-middle" name="mingcute:calendar-2-line" />
              <span class="align-middle">{{ formatUnixTimestamp(article!.publishTime)  }}</span>
            </div>
          </div>
          <div class="flex justify-end col-span-3 align-middle">
            <div class="flex space-x-1 items-center">
              <Icon class="align-middle" name="mingcute:eye-2-line" />
              <span class="align-middle">{{ article!.viewCount }}</span>
            </div>
          </div>

        </div>

        <div class="mb-4 h-[0.5px] bg-primary rounded-full opacity-50">
        </div>

        <div class="min-h-full">
          <MDRender class="max-w-full" :content="article!.content" />
        </div>

        <div class="pt-32 pb-16">
          <Comment/>
        </div>
      </div>

    </div>

    <div class="text-secondary animate-pulse" v-else>
      Loading...
    </div>
  </div>
</template>

<style scoped>

</style>
