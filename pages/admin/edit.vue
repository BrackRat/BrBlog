<script setup lang="ts">
import {getCurrentUnixTimestampInSeconds} from "~/utils/getUnixTimestamp";
import type {ArticleWithContent} from "~/server/types/article";
import ElegantButton from "~/components/ElegantButton.vue";

const route = useRoute()

const loading = ref(false)
const article = ref<ArticleWithContent>({
  id: -1,
  title: '',
  desc: '',
  cover: '',
  content: '',
  viewCount: -1,
  tag: '',
  createTime: getCurrentUnixTimestampInSeconds(),
  publishTime: getCurrentUnixTimestampInSeconds(),
  status: 0
})

async function fetchArticle() {
  if (route.query.id) {
    loading.value = true
    try {
      const response = await useFetch(`/api/article/${route.query.id}`, {
        method: 'GET',
      })
      const {code, data} = response.data.value
      if (code === 200) {
        article.value = data

        loading.value = false
      } else {

        loading.value = false
      }
    } catch (error) {
      console.error('Error fetching article:', error)
      loading.value = false
    }
  }
  loading.value = false
}


fetchArticle()
</script>

<template>
  <div class="flex flex-col justify-center items-center pt-16">
    <ElegantTitle text="EDIT"/>

    <!--    ID:{{ route.query.id }}-->


    <div class="py-8 flex flex-row space-x-4">

      <div class="flex flex-col space-y-4">
        <div class="w-96">
          <label class="font-noto-serif block font-medium leading-6 text-content">Title</label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input id="title" v-model="article.title" type="text"
                   class="block text-lg bg-primary bg-opacity-20 w-full rounded-md border-0 py-1.5 px-4 text-content ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:text-sm sm:leading-6">
          </div>
        </div>

        <div class="w-96">
          <label class="font-noto-serif block font-medium leading-6 text-content">Description</label>
          <div class="relative mt-2 rounded-md shadow-sm">
              <textarea id="desc" v-model="article.desc" type="text"
                        class="block h-32 text-lg bg-primary bg-opacity-20 w-full rounded-md border-0 py-1.5 px-4 text-content ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:text-sm sm:leading-6"/>
          </div>
        </div>
      </div>

      <div class="flex flex-col space-y-4">
        <div class="w-64">
          <label class="font-noto-serif block font-medium leading-6 text-content">Cover</label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input id="cover" v-model="article.cover" type="text"
                   class="block text-lg bg-primary bg-opacity-20 w-full rounded-md border-0 py-1.5 px-4 text-content ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:text-sm sm:leading-6">
          </div>
        </div>

        <div class="w-64">
          <label class="font-noto-serif block font-medium leading-6 text-content">Create Time</label>
          <div class="relative flex mt-2 rounded-md shadow-sm">
            <input id="createTime" v-model="article.createTime" type="text"
                   class="block text-lg bg-primary bg-opacity-20 w-full rounded-md border-0 py-1.5 px-4 text-content ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:text-sm sm:leading-6">
            <ElegantButton @click="article.createTime = getCurrentUnixTimestampInSeconds()" class="pl-4">
              <Icon class="h-4 w-4 my-1" name="mingcute:history-anticlockwise-line"/>
            </ElegantButton>

          </div>
        </div>

        <div class="w-64">
          <label class="font-noto-serif block font-medium leading-6 text-content">Publish Time</label>
          <div class="relative flex mt-2 rounded-md shadow-sm">
            <input id="publishTime" v-model="article.publishTime" type="text"
                   class="block text-lg bg-primary bg-opacity-20 w-full rounded-md border-0 py-1.5 px-4 text-content ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:text-sm sm:leading-6">
            <ElegantButton @click="article.publishTime = getCurrentUnixTimestampInSeconds()" class="pl-4">
              <Icon class="h-4 w-4 my-1" name="mingcute:history-anticlockwise-line"/>
            </ElegantButton>
          </div>
        </div>
      </div>

      <div class="flex flex-col space-y-4">

        <div class="w-64">
          <label class="font-noto-serif block font-medium leading-6 text-content">Status</label>
          <div class="relative flex mt-2 rounded-md shadow-sm">
            <input id="publishTime" v-model="article.publishTime" type="text"
                   class="block text-lg bg-primary bg-opacity-20 w-full rounded-md border-0 py-1.5 px-4 text-content ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:text-sm sm:leading-6">
          </div>


        </div>

        <div class="w-64">
          <label class="font-noto-serif block font-medium leading-6 text-content">Status</label>
          <div class="mt-2">
            <select id="status" name="country" autocomplete="country-name"
                    class="block w-full rounded-md bg-primary bg-opacity-20 border-0 py-1.5 text-content shadow-sm ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:max-w-xs sm:text-sm sm:leading-6">
              <option class="bg-primary bg-opacity-20 ">United States</option>
              <option class="bg-primary bg-opacity-20 ">Canada</option>
              <option class="bg-primary bg-opacity-20 ">Mexico</option>
            </select>
          </div>
        </div>
      </div>


    </div>


    <div class="flex flex-col justify-center items-center text-secondary pb-16">
      <div class="px-16">
        <MdEditor style="width: 80vw" showCodeRowNumber preview-theme="github" v-model="article.content"
                  theme="dark"/>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>