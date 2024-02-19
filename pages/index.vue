<script setup lang="ts">
// import {useBlogStore} from "~/stores/blog";
//
// const blogStore = useBlogStore()
import MoreButton from "~/components/MoreButton.vue";
import ShadowImage from "~/components/ShadowImage.vue";
</script>

<template>
  <div class="flex flex-col justify-center items-center font-frank-ruhl-libre pt-16">


    <!--  弥散光  -->
    <div class="w-full h-full overflow-hidden absolute">
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
      <div class="w-32 ml-8 lg:w-[330px] lg:h-[330px] pt-8 lg:pt-32">
        <nuxt-img class="rounded-full shadow-2xl" src="./icon.jpg"></nuxt-img>
      </div>

      <div class="flex flex-col -mt-4 justify-end px-12 lg:pl-32">
        <p class="text-secondary text-[32px] font-[300] -mb-8 lg:text-[72px] lg:-mb-16 self-end opacity-50">
          Revalidate</p>
        <p class="text-secondary text-[64px] font-[500] lg:text-[140px] lg:-mb-8 self-end lg:font-[600]">BrackRat</p>
        <p class="text-content lg:text-[18px] max-w-[450px]">With a clear direction in mind, day by day, there will be
          progress.</p>
      </div>
    </div>

    <div class="flex flex-col px-8 lg:flex-row relative w-full lg:px-16 justify-around pt-32 lg:pt-64">

      <!--   移动显示   -->
      <ShadowImage class="block self-center md:hidden" image="https://static.brackrat.com/2024/02/19/65d30518e651e.jpg" shadow_x="-top-2"
                   shadow_y="left-2" height="200px" width="300px" rounded="rounded-tr-[100px]"/>


      <!--   宽屏显示   -->
      <ShadowImage class="hidden md:block" image="https://static.brackrat.com/2024/02/19/65d30518e651e.jpg" shadow_x="-top-6" shadow_y="left-6"
                   height="330px" width="500px" rounded="rounded-tr-[100px]"/>


      <div class="flex flex-col ">

        <ElegantTitle text="BLOGS"/>

        <div class="font-noto-serif font-medium flex flex-col space-y-2 pt-4  lg:text-xl">

          <div class="transition-all text-content active:opacity-80 lg:hover:opacity-80 hover:cursor-pointer">
            通过 Docker 部署 Vue + Flask 的前后端分离项目
          </div>
          <div class="br-divide"/>

          <div class="transition-all text-content active:opacity-80 lg:hover:opacity-80 hover:cursor-pointer">
            MoeCTF 2022 WP
          </div>
          <div class="br-divide"/>

          <div class="transition-all text-content active:opacity-80 lg:hover:opacity-80 hover:cursor-pointer">
            BrackRat 的2022年度总结
          </div>

          <div class="br-divide"/>
          <div class="transition-all text-content active:opacity-80 lg:hover:opacity-80 hover:cursor-pointer">
            我的Win11优化方案总结报告

          </div>
        </div>

        <MoreButton @click="$router.push('/blog')"/>

      </div>
    </div>

    <div class="flex relative flex-col w-full px-4 py-32 lg:px-16 lg:py-32 text-secondary ">
      <ElegantTitle text="PROJECTS"/>

      <div class="flex flex-col space-y-16 lg:space-y-0 lg:flex-row font-noto-serif font-medium justify-around pt-8">
          <ElegantWithTitle text="波西的博客" height="360px" width="270px" rounded="rounded-tr-[100px]" image="https://static.brackrat.com/2024/02/19/65d30518e651e.jpg" shadow_x="-top-6" shadow_y="left-6" />

          <ElegantWithTitle text="第二个项目" height="360px" width="270px" rounded="rounded-t-full" image="https://static.brackrat.com/2024/02/19/65d30519521aa.jpg" shadow_x="top-6" shadow_y="right-6" />

          <ElegantWithTitle text="第三个项目" height="360px" width="270px" rounded="rounded-bl-[100px]" image="https://static.brackrat.com/2024/02/19/65d3051a033f9.jpg" shadow_x="top-6" shadow_y="right-6" />

      </div>
      <div class="self-center lg:self-start pt-4 lg:pl-32 ">
        <MoreButton/>
      </div>


    </div>


    <!--      <div class="w-32 h-32 bg-slate-400" @click="blogStore.articlePublishTest()">-->
    <!--        PUBLISH-->
    <!--      </div>-->

  </div>
</template>

<style>
.br-divide {
  opacity: 1;
  background: rgba(15, 18, 19, 1);
  border-top: 1px solid rgba(194, 78, 19, 0.5);
}

</style>
