<script setup lang="ts">
import {checkSupportBrowser} from "~/composables/supportCheck";
import {useBlogStore} from "~/stores/blog";
import type {Article} from "~/server/types/article";
import ElegantButton from "~/components/ElegantButton.vue";


const router = useRouter()

const blogStore = useBlogStore()
const loading = ref(false)

const currentArticlePage = ref(1)
const articles = ref<Article[]>([])

const StatusMap = {
  0: {
    text:"Active",
    style: "bg-green-50 ring-green-600/20 text-green-700 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset"
  },

  1: {
    text:"Hide",
    style: "bg-indigo-200 ring-indigo-600/20 text-indigo-700 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset"
  },

  2: {
    text:"Archived",
    color:"bg-slate-200 ring-slate-600/20 text-slate-700 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset"
  },
}

async function fetchAdminArticles() {
  loading.value = true
  try {
    const response = await useFetch(`/api/article/get`, {
      method: 'GET',
      params: {page: currentArticlePage, getall: true},
      headers: {Authorization: blogStore.token}
    })
    const { code, data } = response.data.value
    console.log(code,data)
    if (code === 200) {
      articles.value = data
      loading.value = false
      return true
    }
  } catch (error) {
    console.error('Error fetching Home:', error)
    return false
  }
  return false
}


async function navigateToEdit(id: number=0)  {
  // await router.push({ path: "/admin/edit",params:{id:id} })
  await router.push(`/admin/edit?id=${id}`)
}

fetchAdminArticles()
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center w-full pt-24 text-secondary">
    <!-- 弥散光 -->
    <div v-if="checkSupportBrowser()" class="w-full h-full overflow-hidden absolute">
      <div
          class="top-[-100px]  lg:right-[400px] rotate-[30deg] w-[200px] h-[620px] blur-[200px] absolute  bg-primary -z-50">
      </div>
    </div>

    <div class="relative w-full h-full flex flex-col justify-center items-center">
      <ElegantTitle text="ADMIN"/>
    </div>

    <div class="relative flex pt-8">
      <ElegantButton @click="navigateToEdit(undefined)">
        <Icon class="mr-4" name="mingcute:add-fill" />
        New
      </ElegantButton>

    </div>

    <div class="relative ">
      <div class="flex mt-4 pb-8 mb-32 flex-col justify-center items-center px-4 font-noto-serif bg-white bg-opacity-5">
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
            <div @click="navigateToEdit(article.id)" class="col-span-3 hover:cursor-pointer hover:underline">
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