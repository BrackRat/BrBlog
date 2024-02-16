<script setup lang="ts">

import {useBlogStore} from "~/stores/blog";

const blogStore = useBlogStore()
</script>

<template>
  <div class="flex flex-col justify-center ">
    <div class="h-screen">
      Introducing BrackRat
      <div class="w-32 h-32 bg-slate-400" @click="blogStore.articlePublishTest()">
        PUBLISH
      </div>
    </div>
  </div>
</template>

