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

</script>

<template>
  <div>
    <div :class="(reverse === 'true' ? 'flex-row-reverse space-x-reverse ' : '') + ' py-16 flex space-x-32 justify-center w-full text-secondary font-noto-serif'">

      <!-- Cover -->
      <ShadowImage image="/images/20200311174352-5e69235813514.jpg" shadow_x="-top-6" shadow_y="left-6" height="360px" width="270px" :rounded="generateRandomRoundedClass()" />

<!--      <div class="flex relative h-[360px] w-[270px]">-->
<!--        <div :class="cardRounded + ' absolute -top-6 left-6  bg-transparent  h-[360px] w-[270px]  outline-border'">-->
<!--        </div>-->
<!--        <nuxt-img :class="cardRounded + ' relative overflow-hidden h-full w-full object-cover bg-slate-400' "-->
<!--                  src="/images/20200311174352-5e69235813514.jpg">-->
<!--        </nuxt-img>-->
<!--      </div>-->

      <!--  Detail  -->
      <div class="flex flex-col">
        <div class="text-4xl font-[600] w-[800px]">
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
        <div class="text-lg font-[200] pt-4 w-[800px]">
          {{article.desc}}
        </div>
        <div class="flex pt-16">
          <div @click="$router.push('/article/' + article.id)" class="active:scale-95 flex px-10 py-2 transition-all  hover:bg-primary hover:bg-opacity-10  font-[500] justify-center items-center text-[24px] hover:cursor-pointer text-primary border-button">
            Navigate
          </div>
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