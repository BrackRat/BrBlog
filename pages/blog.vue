<script setup lang="ts">
import type {Article} from "~/server/types/article";
import {checkSupportBrowser} from "~/composables/supportCheck";
import ElegantTitle from "~/components/ElegantTitle.vue";


useSeoMeta({
  title: "BrackRat's Blogs",
  ogTitle: "BrackRat's Blogs",
  description: "BrackRat's Blogs.",
  ogDescription: "BrackRat's Blogs.",
  twitterCard: "summary_large_image",
});


const route = useRoute()
const router = useRouter()
const loading = ref(false)
const loadingPrev = ref(false)
const loadMoreButtonDisable = ref(false)
const loadPrevButtonDisable = ref(false)
const articles = ref<Article[]>([])
const pageSize = 10
const pageStatus = ref({
  min: 1,
  max: 1
})


async function fetchArticles(page: number = 1, loadingItem: Ref<boolean>) {
  if (page === 1) {
    loadPrevButtonDisable.value = true
  }
  loadingItem.value = true
  try {
    const response = await useFetch(`/api/article/get?page=${page}`, {
      method: 'GET',
    })
    const {code, data} = response.data.value
    if (code === 200 && data.length >= 0) {
      articles.value = [...articles.value, ...data];
      articles.value = articles.value.sort((a, b) => b.publishTime - a.publishTime);
      if (data.length < pageSize) {
        loadMoreButtonDisable.value = true
      }
      loadingItem.value = false

      return true
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    loadingItem.value = false

    return false
  }
  loadingItem.value = false

  return false
}


function generateReverse(index: number) {
  return index % 2 === 0 ? 'false' : 'true';
}


const isInitedPage = ref(false)
const currentPage = ref(1)

function initPage() {
  if (!route.query.page) {
    currentPage.value = 1
    pageStatus.value = {
      min: 1,
      max: 1
    }
  } else {
    const temp: string = route.query.page as string
    currentPage.value = parseInt(temp, 10)
    pageStatus.value = {
      min: currentPage.value,
      max: currentPage.value
    }
  }
}


function main() {
  if (!isInitedPage.value) {
    initPage()
    fetchArticles(currentPage.value, loading)
  } else {
    fetchArticles(undefined, loading)
  }
}

function getLoadingItem(nextDirection: boolean = true) {
  if (nextDirection) {
    return loading
  } else {
    return loadingPrev
  }
}

function fetchPage(nextDirection: boolean = true) {
  if (loading.value) {
    return false
  }
  // 考虑缓存问题
  // 如果向下请求，则请求 pageStatus.max++
  // 如果向上请求，则请求 pageStatus.min++
  let dynamicPage = -1

  if (nextDirection) {
    dynamicPage = pageStatus.value.max + 1
    pageStatus.value.max++
  } else {
    dynamicPage = pageStatus.value.min + -1
    pageStatus.value.min--
  }
  currentPage.value = dynamicPage
  router.push(`/blog?page=${currentPage.value}`)
  fetchArticles(currentPage.value, getLoadingItem(nextDirection))
}


main()
</script>

<template>
  <div class="flex flex-col transition-all">
    <div class="pb-32">

      <div>
        <!-- 弥散光 -->
        <div v-if="checkSupportBrowser()" class="w-full h-full overflow-hidden absolute">
          <div
              class="top-[-300px]  lg:left-[800px] rotate-[-45deg] w-[200px] h-[620px] blur-[200px] absolute  bg-primary -z-50">
          </div>
        </div>

        <div>
          <div class="flex pt-24 relative flex-col justify-center items-center w-full">

            <AnimElegant>
              <ElegantTitle text="BLOGS"/>
            </AnimElegant>

            <div v-if="!loadPrevButtonDisable" @click="fetchPage(false)"
                 class="flex font-noto-serif pt-8 lg:pt-24 self-center">
              <div v-if="!loadingPrev"
                   class=" active:scale-95 flex px-10 py-2 transition-all  hover:bg-primary hover:bg-opacity-10  font-[500] justify-center items-center text-[24px] hover:cursor-pointer text-primary border-bn">
                Prev
              </div>
              <div v-else
                   class="animate-pulse flex px-10 py-2 transition-all  hover:bg-primary hover:bg-opacity-10  font-[500] justify-center items-center text-[24px] hover:cursor-pointer text-primary border-bn">
                Loading...
              </div>
            </div>

            <div>
              <div v-if="loadingPrev" class="hidden lg:block animate-pulse">
                <AnimElegant delay="300" initial-y="-50">

                  <BlogCardClassicSkeleton/>
                </AnimElegant>
              </div>

              <div v-for="(item, index) in articles" :key="index">
                <AnimElegant>
                  <BlogCardClassic class="space-y-96" :article="item" />
                </AnimElegant>
              </div>

              <div v-if="loading" class="hidden lg:block animate-pulse">
                <AnimElegant delay="200">
                  <BlogCardClassicSkeleton/>
                </AnimElegant>
              </div>
            </div>


            <div v-if="!loadMoreButtonDisable" @click="fetchPage()"
                 class="flex font-noto-serif pt-8 lg:pt-24 self-center">
              <div v-if="!loading"
                   class=" active:scale-95 flex px-10 py-2 transition-all  hover:bg-primary hover:bg-opacity-10  font-[500] justify-center items-center text-[24px] hover:cursor-pointer text-primary border-bn">
                More
              </div>
              <div v-else
                   class="animate-pulse flex px-10 py-2 transition-all  hover:bg-primary hover:bg-opacity-10  font-[500] justify-center items-center text-[24px] hover:cursor-pointer text-primary border-bn">
                Loading...
              </div>
            </div>

            <div v-if="loadMoreButtonDisable" class="flex font-noto-serif pt-8 lg:pt-16 self-center">
              <div
                  class=" flex px-10 py-2 transition-all   font-[500] justify-center items-center text-[24px] text-primary">
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
.border-bn {
  border: 1px solid rgba(194, 78, 19, 1);
}

</style>