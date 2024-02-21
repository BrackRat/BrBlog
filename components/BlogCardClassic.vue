<script setup lang="ts">
import type {Article} from "~/server/types/article";
import ShadowImage from "~/components/ShadowImage.vue";

const props = defineProps({
  reverse: {
    type: String,
    required: true,
  },
  article: {
    type: Object as PropType<Article>,
    required: true,
  },
})
function generateRandomRoundedClass() {
  const positions = ['tl', 'tr', 'bl', 'br'];
  const randomPosition = positions[Math.floor(Math.random() * positions.length)];
  return `rounded-${randomPosition}-[100px]`;
}

const windowWidth = ref(0)
const getWindowsResize = function () {
  windowWidth.value = window.innerWidth
}
onMounted(()=>{
  getWindowsResize()
})
</script>

<template>
  <div>
    <div class="px-8 flex-col items-center lg:items-start py-16 flex lg:flex-row lg:space-x-32 justify-center w-full text-secondary font-noto-serif">

      <!-- Cover -->
      <ShadowImage class="hidden lg:block" :image="article.cover" shadow_x="-top-6" shadow_y="left-6" height="360px" width="270px" :rounded="generateRandomRoundedClass()" />

      <ShadowImage class="block lg:hidden" :image="article.cover" shadow_x="-top-4" shadow_y="left-4" height="200px" width="300px" :rounded="generateRandomRoundedClass()" />

      <!--  Detail  -->
      <div class="flex flex-col">
        <div class="text-4xl pt-8 font-[600] lg:w-[800px]">
          {{ article.title }}
        </div>
        <div class="flex space-x-4 opacity-50 pt-2 font-[600]">
          <div>
            {{ formatUnixTimestampEasy(article.publishTime) }}
          </div>
          <div>
            {{ article.viewCount }} Views
          </div>
        </div>
        <div class="text-lg font-[200] pt-4 lg:w-[800px]">
          {{article.desc}}
        </div>
        <div class="flex pt-8 lg:pt-16 self-center lg:self-start">
          <NuxtLink :to="'/article/' + article.shortTitle">
            <div  class=" active:scale-95 flex px-10 py-2 transition-all  hover:bg-primary hover:bg-opacity-10  font-[500] justify-center items-center text-[24px] hover:cursor-pointer text-primary border-button">
              Explore
            </div>
          </NuxtLink>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.border-button{
  border: 1px solid rgba(194, 78, 19, 1);
}

</style>