<script setup lang="ts">
import {checkSupportBrowser} from "~/composables/supportCheck";
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full pt-24 text-secondary">
    <!-- 弥散光 -->
    <div v-if="checkSupportBrowser()" class="w-full h-full overflow-hidden absolute">
      <div
          class="top-[-100px]  lg:right-[300px] rotate-[-70deg] w-[200px] h-[820px] blur-[200px] absolute  bg-primary -z-50">
      </div>
    </div>


    <div class="relative w-full h-full flex flex-col justify-center items-center">
      <ElegantTitle text="ABOUT" />

      <div class="min-h-screen w-full">

      </div>

      <div class="w-4/5 max-w-full lg:w-[800px] pt-32 pb-16">
        <Comment />
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>