<script setup lang="ts">
import {useBlogStore} from "~/stores/blog";
import type {Article} from "~/server/types/article";
import ElegantButton from "~/components/ElegantButton.vue";

const router = useRouter()

const blogStore = useBlogStore()
const loading = ref(false)


const currentArticlePage = ref(1)
const articleTotalCount = ref(0)
const articles = ref<Article[]>([])

const pageSize = 20
// const pageCount = computed(() => {
//   return articleTotalCount.value % pageSize
// })

const haveNext = computed(() => {
  const passAndNow = pageSize * currentArticlePage.value
  return passAndNow < articleTotalCount.value;
})

const havePrev = computed(() => {
  const passAndNow = pageSize * currentArticlePage.value
  return passAndNow > pageSize;
})

const toPrevPage = () => {
  if(havePrev.value){
    currentArticlePage.value--;
    fetchAdminArticles()
  }
}
const toNextPage = () => {
  if(haveNext.value){
    currentArticlePage.value++;
    fetchAdminArticles()
  }
}

const StatusMap = {
  0: {
    text: "Active",
    style: "bg-green-50 ring-green-600/20 text-green-700 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset"
  },

  1: {
    text: "Hide",
    style: "bg-indigo-200 ring-indigo-600/20 text-indigo-700 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset"
  },

  2: {
    text: "Archived",
    style: "bg-slate-200 ring-slate-600/20 text-slate-700 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset"
  },
}

async function fetchAdminArticles() {
  loading.value = true
  try {
    const response = await $fetch(`/api/article/get`, {
      method: 'GET',
      params: {page: currentArticlePage.value, getall: true},
      headers: {Authorization: blogStore.token}
    })
    const {code, data} = response
    if (code === 200) {
      articles.value = data.articles
      articleTotalCount.value = data.total
      loading.value = false
      return true
    }
  } catch (error) {
    console.error('Error fetching Home:', error)
    return false
  }
  return false
}


async function navigateToEdit(shortTitle: string = '') {
  // await router.push({ path: "/admin/edit",params:{id:id} })
  await router.push(`/admin/edit?shortTitle=${shortTitle}`)
}

async function backAdmin() {
  await router.push(`/admin`)
}

fetchAdminArticles()
</script>

<template>
  <div class="flex flex-col">

    <div class="flex px-4 lg:px-0 pt-8 justify-between items-center">
      <div @click="backAdmin" class=" w-24 hover:cursor-pointer hover:opacity-80 transition-all">
        <Icon class="mr-2" name="mingcute:arrow-left-line"/>
        Admin
      </div>

      <ElegantButton  @click="navigateToEdit(undefined)">
        <Icon class="mr-4" name="mingcute:add-fill"/>
        New
      </ElegantButton>

    </div>

    <div class="relative ">
      <div class="flex mt-4 pb-8 mb-8 flex-col px-4 font-noto-serif bg-white bg-opacity-5">
        <div class="flex flex-col">
          <div class="grid grid-cols-7 w-full gap-y-4 font-black py-4">
            <div class="col-span-3">
              Title
            </div>
            <div>
              Status
            </div>
            <div>
              View Count
            </div>
            <div class="justify-self-end">
              Publish Time
            </div>
          </div>
          <div class="bg-primary h-0.5"/>
          <div class="grid grid-cols-7 w-full mt-4" v-for="article in articles">
            <div @click="navigateToEdit(article.shortTitle)" class="col-span-3 hover:cursor-pointer hover:underline">
              {{ article.title }}
            </div>
            <div>
              <span :class="StatusMap[article.status].style">{{ StatusMap[article.status].text }}</span>
            </div>
            <div class="justify-self-end pr-8">
              {{ article.viewCount }}
            </div>
            <div>
              {{ formatUnixTimestamp(article.publishTime) }}
            </div>
          </div>
        </div>

        <div class="flex justify-between pt-8 -mb-4">
          <div>
            Total: {{ articleTotalCount }}
          </div>
          <div class="flex space-x-4">
            <ElegantButton @click="toPrevPage()" :disabled="!havePrev">
              <Icon class="mr-4" name="mingcute:arrow-left-line"/>
              Prev
            </ElegantButton>

            <ElegantButton @click="toNextPage()" :disabled="!haveNext" >
              Next
              <Icon class="ml-4" name="mingcute:arrow-right-line"/>

            </ElegantButton>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.br-divide {
  opacity: 1;
  background: rgba(15, 18, 19, 1);
  border-top: 1px solid rgba(194, 78, 19, 0.5);
}
</style>