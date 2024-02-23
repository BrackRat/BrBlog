<script setup lang="ts">
import MoreButton from "~/components/MoreButton.vue";
import ShadowImage from "~/components/ShadowImage.vue";
import type {OnlyTitle} from "~/server/types/article";
import {checkSupportBrowser} from "~/composables/supportCheck";

useSeoMeta({
  title: "BrackRat's Blog | 波西的博客",
  ogTitle: "BrackRat's Blog | 波西的博客",
  description: "BrackRat's Blog.",
  ogDescription: "BrackRat's Blog.",
  twitterCard: "summary_large_image",
});

const loading = ref(false)
const articleTitles = ref<OnlyTitle[]>([])

const projects = ref([
  {
    text: "波西的博客",
    height: "360px",
    width: "270px",
    rounded: "rounded-tr-[100px]",
    image: "https://static.brackrat.com/blog/2024/02/749c4335e864d4f324a4a75507a9747f.png",
    shadow_x: "-top-6",
    shadow_y: "left-6"
  },
  {
    text: "The Lady with an Ermine",
    height: "360px",
    width: "270px",
    rounded: "rounded-t-full",
    image: "https://static.brackrat.com/blog/2024/02/ff0e52564d5963accd9241b159d108f9.png",
    shadow_x: "top-6",
    shadow_y: "right-6"
  },
  {
    text: "The Tower of Babel",
    height: "360px",
    width: "270px",
    rounded: "rounded-bl-[100px]",
    image: "https://static.brackrat.com/2024/02/19/65d3051a033f9.jpg",
    shadow_x: "top-6",
    shadow_y: "right-6"
  }
]);

async function fetchHome() {
  loading.value = true
  try {
    const response = await useFetch(`/api/article/home`, {
      method: 'GET',
    })
    const {code, data} = response.data.value
    if (code === 200) {
      articleTitles.value = data
      articleTitles.value = articleTitles.value.sort((a, b) => b.publishTime - a.publishTime);

      loading.value = false
      return true
    }
  } catch (error) {
    console.error('Error fetching Home:', error)
    return false
  }
  return false
}

fetchHome()
</script>

<template>
  <div class="flex flex-col justify-center items-center font-frank-ruhl-libre pt-16">


    <!--  弥散光  -->
    <div v-if="checkSupportBrowser()" class="w-full h-full overflow-hidden absolute">
      <!--   头像下   -->
      <div
          class="top-[80px] left-[50px] rotate-[-45deg] w-[200px] h-[620px] blur-[200px] absolute  bg-primary -z-50">
      </div>
      <!--   右上   -->
      <div
          class=" top-[-200px] right-[100px] rotate-[-80deg] w-[100px] h-[500px] blur-[200px] absolute  bg-primary -z-50">
      </div>
      <!--   名字旁   -->
      <div
          class="top-[300px] right-[200px] rotate-[-59deg] w-[240px] h-[100px] absolute rounded-full blur-[100px] bg-primary -z-50">
      </div>
      <!--   Blogs 旁边   -->
      <div
          class="top-[1200px] max-lg:left-[30px] lg:top-[1000px] lg:right-[500px] rotate-[39deg] w-[240px] h-[100px] blur-[100px] absolute rounded-full bg-primary -z-50">
      </div>
      <!--   Blogs 旁边   -->
      <div
          class="top-[1900px] lg:top-[1400px] left-[300px] rotate-[39deg] w-[240px] h-[800px] blur-[300px] absolute rounded-full bg-primary -z-50">
      </div>

    </div>

    <!--  BR Hero  -->
    <div class="flex flex-col lg:flex-row relative justify-around w-full lg:px-32 lg:mb-24">
      <AnimElegant>
        <div class="w-32 ml-8 lg:w-[330px] lg:h-[330px] pt-8 lg:pt-32">
          <nuxt-img class="rounded-full shadow-2xl"
                    src="https://static.brackrat.com/blog/2024/02/9911384e6b7ef52a4c87efc6415e0630.png"></nuxt-img>
        </div>
      </AnimElegant>


      <div class="flex flex-col -mt-4 justify-end px-12 lg:pl-32">
        <AnimElegant :delay="300" class="-mb-8 lg:-mb-16 self-end">
          <p class="text-secondary text-[32px] font-[300] lg:text-[72px] opacity-50">
            Revalidate</p>
        </AnimElegant>

        <AnimElegant class="self-end" :delay="400">
          <p class="text-secondary text-[64px] font-[500] lg:text-[140px] lg:-mb-8  lg:font-[600]">BrackRat</p>
        </AnimElegant>

        <AnimElegant :delay="500">
          <p class="text-content lg:text-[18px] max-w-[450px]">With a clear direction in mind, day by day, there will be
            progress.</p>
        </AnimElegant>
      </div>
    </div>

    <div v-if="articleTitles.length <= 0" class="h-lvh">
      <!--      占位     -->
    </div>

    <!--    Blogs    -->
    <!--    Max Delay 300    -->
    <div v-if="articleTitles.length>0"
         class="flex  lg:mr-32 flex-col  lg:flex-row relative w-full lg:px-16 justify-center items-center lg:justify-between pt-32 lg:pt-64">

      <AnimElegant >
        <!--   移动显示   -->
        <ShadowImage class="block  md:hidden"
                     image="https://static.brackrat.com/2024/02/19/65d30518e651e.jpg"
                     shadow_x="-top-2"
                     shadow_y="left-2" height="200px" width="300px" rounded="rounded-tr-[100px]"/>

      </AnimElegant>

      <AnimElegant :delay="200">
        <!--   宽屏显示   -->
        <ShadowImage class="hidden md:block" image="https://static.brackrat.com/2024/02/19/65d30518e651e.jpg"
                     shadow_x="-top-6" shadow_y="left-6"
                     height="400px" width="600px" rounded="rounded-tr-[100px]"/>

      </AnimElegant>


      <AnimElegant :delay="300">
        <div class="flex flex-col ">

          <ElegantTitle text="BLOGS"/>

          <div class="font-noto-serif font-medium flex flex-col space-y-2 pt-4  lg:text-xl">

            <!--          <div v-if="articleTitles.length <=0" v-for="_ in [1,2,3,4]">-->
            <!--            <div-->
            <!--                class="bg-primary opacity-20 h-8  transition-all pb-2 lg:w-[550px] text-content active:opacity-80 lg:hover:opacity-80 hover:cursor-pointer">-->

            <!--            </div>-->
            <!--          </div>-->

            <div v-for="(item, idx) in articleTitles">
              <div
                  class="transition-all pb-2 lg:w-[550px] text-content active:opacity-80 lg:hover:opacity-80 hover:cursor-pointer">
                <NuxtLink :to="'/article/' + item.shortTitle">
                  {{ item.title }}
                </NuxtLink>
              </div>

              <div v-if="idx !== articleTitles.length-1" class="br-divide"/>
            </div>

          </div>
          <NuxtLink to="/blog">
            <MoreButton/>
          </NuxtLink>

        </div>
      </AnimElegant>

    </div>

    <!--   Projects   -->
    <!--   Init Delay 400   -->
    <!--   Max Delay X   -->
    <div v-if="articleTitles.length > 0"
         class="flex relative flex-col w-full px-4 py-32 lg:px-16 lg:py-32 text-secondary ">
      <AnimElegant>
        <ElegantTitle text="PROJECTS"/>
      </AnimElegant>

      <div class="flex flex-col space-y-16 lg:space-y-0 lg:flex-row font-noto-serif font-medium justify-around pt-8">
        <div v-for="(item, index) in projects" :key="index">
          <AnimElegant :delay="index * 100">
            <ElegantWithTitle :key="index" v-bind="item"/>
          </AnimElegant>
        </div>
      </div>
      <!--      <div class="self-center lg:self-start pt-4 lg:pl-32 ">-->
      <!--        <MoreButton/>-->
      <!--      </div>-->
    </div>

  </div>
</template>

<style>
.br-divide {
  opacity: 1;
  background: rgba(15, 18, 19, 1);
  border-top: 1px solid rgba(194, 78, 19, 0.5);
}

</style>
