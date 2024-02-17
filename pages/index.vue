<script setup lang="ts">
// import {useBlogStore} from "~/stores/blog";
//
// const blogStore = useBlogStore()
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
          class="top-[1000px] right-[500px] rotate-[39deg] w-[240px] h-[100px] blur-[100px] absolute rounded-full bg-primary -z-50">
      </div>
      <!--   Blogs 旁边   -->
      <div
          class="top-[1400px] left-[300px] rotate-[39deg] w-[240px] h-[800px] blur-[300px] absolute rounded-full bg-primary -z-50">
      </div>

    </div>

    <!--  BR Hero  -->
    <div class="flex relative justify-around w-full px-32 mb-24">
      <div class="w-[330px] h-[330px]  pt-32">
        <nuxt-img class="rounded-full shadow-2xl" src="./icon.jpg"></nuxt-img>
      </div>

      <div class="flex flex-col justify-end pl-32">
        <p class="text-secondary opacity-50 text-[72px] -mb-16 self-end">Revalidate</p>
        <p class="text-secondary text-[140px] -mb-8 self-end font-[600]">BrackRat</p>
        <p class="text-content text-[18px] max-w-[450px]">With a clear direction in mind, day by day, there will be
          progress.</p>
      </div>
    </div>

    <div class="flex relative w-full px-16 justify-around pt-64">

      <div class="relative">
        <div class="absolute -top-8 left-8  bg-transparent  h-[400px] w-[800px] rounded-tr-[100px] outline-border">
        </div>
        <div class="relative h-[400px] w-[800px] z-30">
          <nuxt-img class="overflow-hidden h-full w-full object-cover bg-slate-400 rounded-tr-[100px]"
                    src="/images/20200314110609-5e6cbaa171e81.jpg">
          </nuxt-img>
        </div>

      </div>

      <div class="flex  flex-col ">

        <div class=" flex text-secondary items-baseline">
          <div class="text-[72px]">
            B
          </div>
          <div class="text-[48px]">
            LOGS
          </div>
        </div>

        <div class="font-noto-serif font-medium flex flex-col space-y-2 pt-4">

          <div class=" text-content text-xl hover:opacity-80 hover:cursor-pointer">
            通过 Docker 部署 Vue + Flask 的前后端分离项目
          </div>
          <div class="br-divide"/>

          <div class="text-content text-xl hover:opacity-80 hover:cursor-pointer">
            MoeCTF 2022 WP
          </div>
          <div class="br-divide"/>

          <div class="text-content text-xl hover:opacity-80 hover:cursor-pointer">
            BrackRat 的2022年度总结
          </div>

          <div class="br-divide"/>
          <div class="text-content text-xl hover:opacity-80 hover:cursor-pointer">
            我的Win11优化方案总结报告

          </div>
        </div>

        <div class="mt-8 more-button hover:cursor-pointer flex justify-center items-center  rounded-full w-32">
          <div class="text-primary text-xl">
            More
          </div>
          <Icon class="text-primary ml-4" name="mingcute:arrow-right-line"></Icon>
        </div>

      </div>
    </div>

    <div class="flex relative flex-col w-full px-16 py-32 text-secondary ">
      <div class=" flex text-secondary items-baseline">
        <div class="text-[72px]">
          P
        </div>
        <div class="text-[48px]">
          ROJECTS
        </div>
      </div>

      <div class="font-noto-serif font-medium flex justify-around pt-8">

        <div class="flex flex-col items-center">
          <div class="relative h-[360px] w-[270px]">
            <div class="absolute -top-6 left-6  bg-transparent  h-[360px] w-[270px] rounded-tr-[100px] outline-border">
            </div>
            <nuxt-img class="relative rounded-tr-[100px] overflow-hidden h-full w-full object-cover bg-slate-400 "
                      src="/images/20200311174352-5e69235813514.jpg">
            </nuxt-img>
          </div>
          <div class="text-content pt-8 text-xl ">
            波西的博客
          </div>
        </div>

        <div class="flex flex-col items-center">
          <div class="relative h-[360px] w-[270px]">
            <div class="absolute top-6 right-6  bg-transparent  h-[360px] w-[270px] rounded-t-full outline-border">
            </div>
            <nuxt-img class="relative rounded-t-full overflow-hidden h-full w-full object-cover bg-slate-400 "
                      src="/images/20200416224600-5e986fa8b804f.jpg">
            </nuxt-img>
          </div>
          <div class=" text-content pt-8 text-xl ">
            波西的博客
          </div>
        </div>

        <div class="flex flex-col items-center">
          <div class="relative h-[360px] w-[270px]">
            <div class="absolute top-6 right-6  bg-transparent  h-[360px] w-[270px] rounded-bl-[100px] outline-border">
            </div>
            <nuxt-img class="relative rounded-bl-[100px] overflow-hidden h-full w-full object-cover bg-slate-400 "
                      src="/images/20200314110609-5e6cbaa171e81.jpg">
            </nuxt-img>
          </div>
          <div class=" text-content pt-8 text-xl ">
            波西的博客
          </div>
        </div>

      </div>

      <div class="mt-8 ml-32 more-button hover:cursor-pointer flex justify-center items-center  rounded-full w-32">
        <div class="text-primary text-xl">
          More
        </div>
        <Icon class="text-primary ml-4" name="mingcute:arrow-right-line"></Icon>
      </div>

    </div>

    <!--      <div class="super-blur w-64 h-64">-->
    <!--      </div>-->

    <!--      <div class="w-32 h-32 bg-slate-400" @click="blogStore.articlePublishTest()">-->
    <!--        PUBLISH-->
    <!--      </div>-->


  </div>
</template>

<style>
.outline-border {
  opacity: 1;
  border: 1px solid rgba(194, 78, 19, 0.5);
}

.br-divide {
  opacity: 1;
  background: rgba(15, 18, 19, 1);
  border-top: 1px solid rgba(194, 78, 19, 0.5);
}

.more-button {
  opacity: 1;
  border: 1px solid rgba(194, 78, 19, 1);
}
</style>
