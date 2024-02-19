<script setup lang="ts">
import type {Article} from "~/server/types/article";
import {checkSupportBrowser} from "~/composables/supportCheck";
import ElegantTitle from "~/components/ElegantTitle.vue";

const loading = ref(true)
const loadMoreButtonDisable = ref(false)
const articles = ref<Article[]>([])

async function fetchArticles(page:number = 1) {
  loading.value = true
  try {
    const response = await useFetch(`/api/article?page=${page}`, {
      method: 'GET',
    })
    if (response.data.value && response.data.value.length >= 0) {
      articles.value = [...articles.value, ...response.data.value];
      currentPage.value++;
      loading.value = false
      if(response.data.value.length < 3){
        loadMoreButtonDisable.value = true
      }
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

const currentPage = ref(1)

const loadMore = () => {
  if(loading){
    fetchArticles(currentPage.value)
  }
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
              class="top-[-300px]  lg:left-[800px] rotate-[-45deg] w-[200px] h-[620px] blur-[200px] absolute  bg-primary -z-50">
          </div>
        </div>

        <div>
          <div  class="flex pt-24 relative flex-col justify-center items-center w-full">

            <ElegantTitle text="BLOGS" />

            <div v-auto-animate>
              <div  v-for="(item, index) in articles" :key="index">
                <BlogCardClassic class="space-y-96" :article="item" :reverse="generateReverse(index)"/>
              </div>

              <div v-if="loading" class="hidden lg:block animate-pulse">
                <BlogCardClassicSkeleton />
              </div>
            </div>


            <div v-if="!loadMoreButtonDisable"  @click="loadMore()" class="flex font-noto-serif pt-8 lg:pt-24 self-center">
              <div v-if="!loading" class=" active:scale-95 flex px-10 py-2 transition-all  hover:bg-primary hover:bg-opacity-10  font-[500] justify-center items-center text-[24px] hover:cursor-pointer text-primary border-bn">
                More
              </div>
              <div v-else class="animate-pulse flex px-10 py-2 transition-all  hover:bg-primary hover:bg-opacity-10  font-[500] justify-center items-center text-[24px] hover:cursor-pointer text-primary border-bn">
                Loading...
              </div>
            </div>

            <div v-if="loadMoreButtonDisable" class="flex font-noto-serif pt-8 lg:pt-16 self-center">
              <div class=" flex px-10 py-2 transition-all   font-[500] justify-center items-center text-[24px] text-primary">
                No more tales to tell.
              </div>
            </div>


          </div>
        </div>


      </div>

    </div>

  </div>
</template>

<style scoped>
.border-bn{
  border: 1px solid rgba(194, 78, 19, 1);
}

</style>