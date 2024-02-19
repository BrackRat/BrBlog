<script setup lang="ts">
import {getCurrentUnixTimestampInSeconds} from "~/utils/getUnixTimestamp";
import type {ArticleWithContent} from "~/server/types/article";

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

    <div class="flex flex-col justify-center items-center text-secondary">
      <div class="px-16">
        <MdEditor style="width: 80vw" showCodeRowNumber preview-theme="github"  v-model="article.content" theme="dark"/>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>