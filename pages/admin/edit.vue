<script setup lang="ts">
import {getCurrentUnixTimestampInSeconds} from "~/utils/getUnixTimestamp";
import type {ArticleWithContent} from "~/server/types/article";
import ElegantButton from "~/components/ElegantButton.vue";
import {useBlogStore} from "~/stores/blog";

const route = useRoute()
const blogStore = useBlogStore()

const loading = ref(false)
const article = ref<ArticleWithContent>({
  id: -1,
  shortTitle:'',
  title: '',
  desc: '',
  cover: '',
  content: '',
  viewCount: 0,
  tag: '',
  createTime: getCurrentUnixTimestampInSeconds(),
  publishTime: getCurrentUnixTimestampInSeconds(),
  status: 0
})

function articlePreprocess() {
  article.value.publishTime = parseInt(article.value.publishTime.toString(),10)
  article.value.createTime = parseInt(article.value.createTime.toString(),10)
}

async function fetchArticle() {
  articlePreprocess()
  if (route.query.shortTitle !== '') {
    loading.value = true
    try {
      const response = await useFetch(`/api/article/${route.query.shortTitle}?getAll=true`, {
        method: 'GET',
        headers: {Authorization: blogStore.token}
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

const sending = ref(false)
const msg = ref("")

async function saveArticle() {
  sending.value = true
  articlePreprocess()
  msg.value = "Loading..."
    try {
      const response = await $fetch(`/api/article/change`, {
        method: 'POST',
        headers: {Authorization: blogStore.token},
        body:article.value
      })
      const {code} = response
      if (code === 200) {
        console.log("Success")
        msg.value = "OK~"
        await backArticle()

        setTimeout(() => {msg.value = ""},3000)
      } else {
        msg.value = `Failed:${code}`
      }
    } catch (error) {
      console.error('Error fetching article:', error)
      msg.value = `'Error fetching article:', ${error}`
    }
  sending.value = false
}

async function publishArticle() {
  articlePreprocess()
  sending.value = true
  msg.value = "Loading..."
  try {
    const response = await $fetch(`/api/article/create`, {
      method: 'POST',
      headers: {Authorization: blogStore.token},
      body:article.value
    })
    const {code} = response
    if (code === 200) {
      console.log("Success")
      msg.value = "OK~"
      await backArticle()

      setTimeout(() => {msg.value = ""},3000)
    } else {
      msg.value = `Failed:${code}`
    }
  } catch (error) {
    console.error('Error fetching article:', error)
  }
  sending.value = false
}


async function deleteArticle() {
  sending.value = true
  msg.value = "Loading..."
  try {
    const response = await $fetch(`/api/article/delete`, {
      method: 'POST',
      headers: {Authorization: blogStore.token},
      body: {id:article.value.id}
    })
    const {code} = response
    if (code === 200) {
      console.log("Success")
      msg.value = "OK~"
      await backArticle()
      setTimeout(() => {msg.value = ""},3000)
    } else {
      msg.value = `Failed:${code}`
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    msg.value = `'Error fetching article:', ${error}`
  }
  sending.value = false
}

const router = useRouter()
async function backArticle() {
  await router.push(`/admin/article`)
}

fetchArticle()
</script>

<template>
  <div class="flex flex-col justify-center items-center pt-16">
    <div @click="backArticle" class="w-24 self-center lg:ml-16 lg:self-start hover:cursor-pointer hover:opacity-80 transition-all">
      <Icon class="mr-2" name="mingcute:arrow-left-line"/>
      Article
    </div>

    <div class="py-8 flex flex-col space-y-12 lg:space-y-0 lg:flex-row lg:space-x-16">

      <div class="flex flex-col space-y-4">
        <div class="w-64 lg:w-96">
          <label class="font-noto-serif block font-medium leading-6 text-content">Title</label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input id="title" v-model="article.title" type="text"
                   class="block text-lg bg-primary bg-opacity-20 w-full rounded-md border-0 py-1.5 px-4 text-content ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:text-sm sm:leading-6">
          </div>
        </div>

        <div class="w-64 lg:w-96">
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
          <label class="font-noto-serif block font-medium leading-6 text-content">Short Title</label>
          <div class="relative flex mt-2 rounded-md shadow-sm">
            <input id="shortTitle" v-model="article.shortTitle" type="text"
                   class="block text-lg bg-primary bg-opacity-20 w-full rounded-md border-0 py-1.5 px-4 text-content ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:text-sm sm:leading-6">
          </div>
        </div>

        <div class="w-64">
          <label class="font-noto-serif block font-medium leading-6 text-content">Tag</label>
          <div class="relative flex mt-2 rounded-md shadow-sm">
            <input id="tag" v-model="article.tag" type="text"
                   class="block text-lg bg-primary bg-opacity-20 w-full rounded-md border-0 py-1.5 px-4 text-content ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:text-sm sm:leading-6">
          </div>
        </div>

        <div class="w-64">
          <label class="font-noto-serif block font-medium leading-6 text-content">Status</label>
          <div class="mt-2">
            <select  id="status" name="status" v-model="article.status"
                    class="block w-full rounded-md bg-primary bg-opacity-20 border-0 py-1.5 text-content shadow-sm ring-1 ring-inset ring-content focus:ring-2 focus:ring-inset focus:ring-content sm:max-w-xs sm:text-sm sm:leading-6">
              <option :value="0" class="bg-black bg-opacity-70 ">Active</option>
              <option :value="1" class="bg-black bg-opacity-70 ">Hide</option>
              <option :value="2" class="bg-black bg-opacity-70 ">Archived</option>
            </select>
          </div>
        </div>
      </div>


    </div>

    <div class="flex py-8 flex-col items-center space-y-2">
      <div class="flex items-center">
        <ElegantButton @click="publishArticle()" v-if="route.query.shortTitle === ''" >
          <Icon class="mr-4" name="mingcute:upload-line" />
          Publish
        </ElegantButton>
        <ElegantButton  @click="saveArticle()" v-else >
          <Icon  class="mr-4" name="mingcute:save-2-line" />
          Save
        </ElegantButton>
        <DeleteConfirm class="ml-8" v-if="route.query.id !== '0'" @really="deleteArticle()" />

      </div>
      <div class="text-content ">
        {{ msg }}
      </div>
    </div>


    <div class="flex flex-col justify-center items-center text-secondary pb-16">
      <div class="px-16">
        <MdEditor style="width: 80vw;max-width: 1050px" showCodeRowNumber preview-theme="github" v-model="article.content"
                  theme="dark"/>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>