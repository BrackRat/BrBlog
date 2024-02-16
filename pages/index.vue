<script setup lang="ts">

import {useBlogStore} from "~/stores/blog";

const blogStore = useBlogStore()
</script>

<template>
  <div class="flex flex-col justify-center ">
    <div class="">
      Introducing BrackRat
      <div class="w-32 h-32 z-10">
        <nuxt-img class="rounded-full shadow-2xl" src="./icon.jpg"></nuxt-img>
      </div>
      <div class="super-blur w-64 h-64">
      </div>

<!--      <div class="w-32 h-32 bg-slate-400" @click="blogStore.articlePublishTest()">-->
<!--        PUBLISH-->
<!--      </div>-->
    </div>
  </div>
</template>

<style>
.super-blur{
  position: fixed;
  opacity: 1;
  background: rgba(224, 173, 110, 1);
  filter: blur(300px);
  z-index: 0;
}
</style>
