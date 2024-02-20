<script setup lang="ts">
import {checkSupportBrowser} from "~/composables/supportCheck";

const about = "🌌Introduction\n" +
    "\n" +
    "> My heart has a purpose, and I will make progress day after day.\n" +
    "> 心有所向，日复一日，必有精进。\n" +
    "\n" +
    "- 🏫 Undergraduate student of Xidian University.\n" +
    "- 📫 You can get in touch with me by email at brackrat256@outlook.com\n" +
    "\n" +
    "\n" +
    "\n" +
    "  [1]: https://cdn.liil.cc/kodbox/imagesheet/imageUp/20211107214227.png"

useSeoMeta({
  title: "About BrackRat",
  ogTitle: "About BrackRat",
  description: `About BrackRat.${about}`,
  ogDescription: `About BrackRat.${about}`,
  twitterCard: "summary_large_image",
});
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

      <div class="w-4/5 max-w-full lg:w-[800px] pt-14 pb-16">
        <MDRender class="max-w-full" :content="about" />
      </div>


      <div class="w-4/5 max-w-full lg:w-[800px] pt-32 pb-16">
        <Comment />
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>