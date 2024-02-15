<script setup lang="ts">
import type {Article} from "~/server/types/article";

const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true,
  },
})

const item:Article = props.article

// function getArticle() {
//   const response = useFetch("/api/article/"+props.article.id, {
//     method: 'GET',
//   })
//   if(response.data.value?.length && response.data.value?.length > 0){
//     articles.value = response.data.value
//   }
// }
</script>

<template>
  <div class="hover:cursor-pointer w-auto md:max-w-80 lg:max-w-80 transition-all flex flex-col m-2 hover:shadow-2xl hover:-translate-y-1 duration-300">

    <div class="h-64 overflow-hidden">
      <nuxt-img src="https://images.pexels.com/photos/16518164/pexels-photo-16518164.jpeg?auto=compress&cs=tinysrgb" class="bg-blue-400 rounded-t">
        $COVER
        <!--      {{ item.cover }}-->
      </nuxt-img>
    </div>

    <div class="bg-white rounded-b p-4">
      <div class="flex flex-row space-x-2 text-sm font-bold text-gray-400">
        <div>
          TAG
          <!--        {{item.tag}}-->
        </div>
        <div>
          TIME
          <!--        {{ item.publishTime }}-->
        </div>
      </div>

      <div class="text-lg font-black mt-2">
        标题标题标题标题标题标题标题标题
        <!--      {{item.title}}-->
      </div>
      <div class="text-ellipsis mt-2 overflow-hidden h-12 text-gray-600">
        简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>