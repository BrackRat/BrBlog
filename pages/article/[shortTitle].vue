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
    const {code, data} = response.data.value
    if (code === 200) {
      article.value = data

      let temp_description = article.value?.desc
      if (temp_description === '') {
        temp_description = article.value?.content.slice(0, 200)
      }

      useSeoMeta({
        title: article.value?.title,
        ogTitle: article.value?.title,
        description: temp_description,
        ogDescription: temp_description,
        twitterCard: "summary_large_image",
      });

      loading.value = false
    } else {
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
        status: 0
      }
      loading.value = false
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    loading.value = false
  }
}


async function addViewCount() {
  await $fetch(`/api/article/read/${shortTitle}`, {
    method: 'GET',
  })
}

onMounted(() => {

  setTimeout((() => {
    addViewCount()
  }), 5000)
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

    <div class="relative" v-if="!loading && article">
      <div class="flex flex-col w-96 px-4 lg:w-[1000px]">
        <div class="pt-32 max-w-screen flex flex-col justify-center items-center">
          <AnimElegant>

            <ShadowImage class="hidden md:block" height="360px" width="1000px" rounded="rounded-tr-[100px]"
                         :image="article.cover" shadow_x="-top-6" shadow_y="left-6"/>
            <ShadowImage class="block md:hidden self-center" height="200px" width="300px" rounded="rounded-br-[50px]"
                         :image="article.cover" shadow_x="-top-6" shadow_y="left-6"/>
          </AnimElegant>

        </div>

        <AnimElegant >
          <div class="pt-8 text-3xl text-primary font-black mb-2">
            {{ article.title }}
          </div>


          <div class="mb-2 text-secondary">
            {{ article.desc }}
          </div>

          <div class="mb-4 flex space-x-8 text-sm  text-content ">
            <div>
              <div class="flex space-x-1 items-center">
                <Icon class="align-middle" name="mingcute:calendar-2-line"/>
                <span class="align-middle">{{ formatUnixTimestamp(article.publishTime) }}</span>
              </div>
            </div>
            <div class="flex justify-end col-span-3 align-middle">
              <div class="flex space-x-1 items-center">
                <Icon class="align-middle" name="mingcute:eye-2-line"/>
                <span class="align-middle">{{ article.viewCount }}</span>
              </div>
            </div>

          </div>
        </AnimElegant>

        <div class="mb-4 h-[0.5px] bg-primary rounded-full opacity-50">
        </div>


        <div class="min-h-screen">
            <MDRender class="w-full" :content="article.content"/>
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
