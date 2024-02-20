<script setup lang="ts">

import {checkSupportBrowser} from "~/composables/supportCheck";
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center w-full pt-24 text-secondary">
    <!-- 弥散光 -->
    <div v-if="checkSupportBrowser()" class="w-full h-full overflow-hidden absolute">
      <div
          class="top-[-100px]  lg:right-[400px] rotate-[30deg] w-[200px] h-[620px] blur-[200px] absolute  bg-primary -z-50">
      </div>
    </div>

    <div class="relative w-full h-full flex flex-col justify-center items-center">
      <ElegantTitle text="ADMIN"/>
    </div>
    <div class="relative pt-16 ">
      <NuxtPage />

    </div>
  </div>
</template>

<style scoped>

</style>