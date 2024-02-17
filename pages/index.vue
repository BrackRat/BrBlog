<script setup lang="ts">

import {useBlogStore} from "~/stores/blog";

const blogStore = useBlogStore()
</script>

<template>

  <div class="flex flex-col justify-center items-center font-frank-ruhl-libre">
    <div class="w-full h-full overflow-hidden absolute ">
      <div
          class="top-[80px] left-[50px] rotate-[-45deg] w-[200px] h-[620px] blur-[200px] absolute super-blur bg-primary -z-50">
      </div>

      <div
          class=" top-[-200px] right-[100px] rotate-[-80deg] w-[100px] h-[500px] blur-[200px] absolute super-blur bg-primary -z-50">
      </div>

    </div>


    <div class="flex relative justify-around w-full px-32 mb-24">
      <div class="w-[330px] h-[330px]  pt-32">
        <nuxt-img class="rounded-full shadow-2xl" src="./icon.jpg"></nuxt-img>
      </div>

      <div class="flex flex-col justify-end pl-32">
        <p class="text-secondary opacity-50 text-[72px] -mb-16 self-end">Revalidate</p>
        <p class="text-secondary text-[140px] -mb-8 self-end">BrackRat</p>
        <p class="text-content text-[18px] max-w-[450px]">With a clear direction in mind, day by day, there will be
          progress.</p>
      </div>
    </div>

    <div class="flex relative w-full px-16 justify-around pt-64">

      <div class="relative">
        <div class="h-[400px] w-[800px]">
          <nuxt-img class="overflow-hidden h-full w-full object-cover bg-slate-400 rounded-tr-[100px]"
                    src="/images/20200314110609-5e6cbaa171e81.jpg">
          </nuxt-img>
        </div>
        <!--        <div class="top-32 h-[300px] w-[600px] rounded-tr-[100px] border">-->
        <!--        </div>-->
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

        <div class="font-serif flex flex-col space-y-2 pt-4">

          <div class="text-content text-xl hover:opacity-80 hover:cursor-pointer">
            通过 Docker 部署 Vue + Flask 的前后端分离项目
          </div>
          <div class="br-divide"/>

          <div class="text-content text-xl hover:opacity-80 hover:cursor-pointer">
            通过 Docker 部署 Vue + Flask 的前后端分离项目
          </div>

          <div class="br-divide"/>

          <div class="text-content text-xl hover:opacity-80 hover:cursor-pointer">
            通过 Docker 部署 Vue + Flask 的前后端分离项目
          </div>

          <div class="br-divide"/>
          <div class="text-content text-xl hover:opacity-80 hover:cursor-pointer">
            通过 Docker 部署 Vue + Flask 的前后端分离项目
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

    <div class="flex relative flex-col w-full px-16 pt-32 text-secondary ">
      <div class=" flex text-secondary items-baseline">
        <div class="text-[72px]">
          P
        </div>
        <div class="text-[48px]">
          ROJECTS
        </div>
      </div>

      <div class="flex justify-around">

        <div class="flex flex-col items-center">
          <div class="h-[360px] w-[270px]">
            <nuxt-img class="rounded-tr-[100px] overflow-hidden h-full w-full object-cover bg-slate-400 "
                      src="/images/20200314110609-5e6cbaa171e81.jpg">
            </nuxt-img>
          </div>
          <div class="font-serif text-content pt-8 text-xl font-bold">
            波西的博客
          </div>
        </div>

        <div class="flex flex-col items-center">
          <div class="h-[360px] w-[270px]">
            <nuxt-img class="rounded-t-full overflow-hidden h-full w-full object-cover bg-slate-400 "
                      src="/images/20200314110609-5e6cbaa171e81.jpg">
            </nuxt-img>
          </div>
          <div class="font-serif text-content pt-8 text-xl font-bold">
            波西的博客
          </div>
        </div>

        <div class="flex flex-col items-center">
          <div class="h-[360px] w-[270px]">
            <nuxt-img class="rounded-bl-[100px] overflow-hidden h-full w-full object-cover bg-slate-400 "
                      src="/images/20200314110609-5e6cbaa171e81.jpg">
            </nuxt-img>
          </div>
          <div class="font-serif text-content pt-8 text-xl font-bold">
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
.super-blur {
  opacity: 1;
  z-index: 0;
}

.br-divide {
  opacity: 1;
  background: rgba(15, 18, 19, 1);
  border-top: 1px solid rgba(194, 78, 19, 0.5);
}

.more-button {
  opacity: 1;
  background: rgba(15, 18, 19, 1);
  border: 1px solid rgba(194, 78, 19, 1);
}
</style>
