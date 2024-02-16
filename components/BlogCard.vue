<script setup lang="ts">
import type {Article} from "~/server/types/article";
import {formatUnixTimestamp, formatUnixTimestampEasy} from "~/composables/formatTime";

const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true,
  },
})

const item:Article = props.article

</script>

<template>
  <div @click="$router.push('/article/' + item.id)" class="shadow-lg hover:cursor-pointer w-auto md:max-w-80 lg:max-w-80 transition-all flex flex-col m-2 hover:shadow-2xl hover:-translate-y-1 duration-300">

    <div class="h-64">
      <nuxt-img class="overflow-hidden h-full w-full object-cover bg-slate-400 rounded-t" :src="item.cover" >
      </nuxt-img>
    </div>

    <div class="bg-white rounded-b p-4">

      <div class="text-lg font-black mb-1">
              {{item.title}}
      </div>
      <div class="mb-4 text-ellipsis overflow-hidden h-12 text-gray-600">
        {{ item.desc }}
      </div>

      <div class="grid grid-cols-5 space-x-2 text-sm  text-gray-300">
        <div>
                  {{item.tag}}
        </div>
        <div>
          {{ formatUnixTimestampEasy(item.publishTime) }}
        </div>
        <div class="flex justify-end col-span-3 align-middle">
          <div class="flex space-x-1 items-center">
            <Icon class="align-middle" name="mingcute:eye-2-line" />
            <span class="align-middle">{{ item.viewCount }}</span>
          </div>
        </div>

      </div>

    </div>



  </div>
</template>

<style scoped>

</style>