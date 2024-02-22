<script setup lang="ts">
import {checkSupportBrowser} from "~/composables/supportCheck";

const about = `# BrackRat

> INTP-T
>
> 内向 90%
>
> 直觉 78%
>
> 理性 67%
>
> 展望 77%
>
> 起伏不定 51%

睡眠主义者，他觉得人生而为了睡觉。

语言能力较弱，不太擅长交流，但是正在勇于尝试中。如果他说出了什么不太正确的话，请随意指正，他会十分感谢你！

工具拥抱者，永远在用他的各种小工具（或者创造一个小工具）

## My Tech Stacks

### Creativity

![Static Badge](https://img.shields.io/badge/Adobe%20Photoshop-000000?style=for-the-badge&logo=adobe%20Photoshop&logoColor=white&color=%23062038)![Static Badge](https://img.shields.io/badge/Adobe%20After%20Effects-000000?style=for-the-badge&logo=Adobe%20After%20Effects&logoColor=white&color=%23070857)![](https://img.shields.io/badge/Adobe%20Audition-000000?style=for-the-badge&logo=Adobe%20Audition&color=%23070857)![](https://img.shields.io/badge/Adobe%20Premiere%20Pro-000000?style=for-the-badge&logo=Adobe%20Premiere%20Pro&color=%23070857)![Static Badge](https://img.shields.io/badge/Adobe%20Illustrator-000000?style=for-the-badge&logo=Adobe%20Illustrator&color=%2332080B)![Static Badge](https://img.shields.io/badge/DaVinci%20Resolve-000000?style=for-the-badge&logo=DaVinci%20Resolve&color=%23253A51)

### Languages

![Static Badge](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white)![Static Badge](https://img.shields.io/badge/Typescript-000000?style=for-the-badge&logo=Typescript&logoColor=white&color=%233478CB)

### Backend

![Static Badge](https://img.shields.io/badge/FastAPI-000000?style=for-the-badge&logo=FastAPI&logoColor=white&color=%2305998B)![Static Badge](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white&color=%233AA9BF)![Static Badge](https://img.shields.io/badge/Prisma-000000?style=for-the-badge&logo=Prisma&logoColor=white&color=%2310384E)

### Frontend

![Static Badge](https://img.shields.io/badge/Nuxt3-000000?style=for-the-badge&logo=nuxtdotjs&logoColor=white&color=%2334DE85)![Static Badge](https://img.shields.io/badge/%20%20Tailwind%20CSS-000000?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white&color=%2353BBF7)![Static Badge](https://img.shields.io/badge/Vue3-000000?style=for-the-badge&logo=Vuedotjs&logoColor=white&color=%2342B883)

### Database

![Static Badge](https://img.shields.io/badge/Postgre%20SQL-000000?style=for-the-badge&logo=PostgreSQL&logoColor=white&color=%233C6690)![Static Badge](https://img.shields.io/badge/Mysql-000000?style=for-the-badge&logo=Mysql&logoColor=white&color=%23235A83)

### Analysis Tool

![Static Badge](https://img.shields.io/badge/Microsoft%20Clarity-000000?style=for-the-badge&logo=Microsoft%20Clarity&logoColor=white&color=%23235A83)![Static Badge](https://img.shields.io/badge/Google%20Analytics-000000?style=for-the-badge&logo=Google%20Analytics&logoColor=white&color=%23DD7515)

### Cloud Platforms

![Static Badge](https://img.shields.io/badge/Cloudflare-000000?style=for-the-badge&logo=Cloudflare&logoColor=white&color=%23F4801F)![Static Badge](https://img.shields.io/badge/Netlify-000000?style=for-the-badge&logo=Netlify&logoColor=white&color=%2305BDBA)![Static Badge](https://img.shields.io/badge/TiDB-000000?style=for-the-badge&logo=TiDB&logoColor=white&color=%23303EAB)![Static Badge](https://img.shields.io/badge/Zeabur-000000?style=for-the-badge&logo=Zeabur&logoColor=white&color=%236300FF)

`

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
      <AnimElegant>

      <ElegantTitle text="ABOUT" />
      </AnimElegant>


      <div class="w-4/5 max-w-full lg:w-[800px] pt-14 pb-16">
        <AnimElegant delay="200">

        <MDRender class="max-w-full" :content="about" />
        </AnimElegant>
      </div>


      <div class="w-4/5 max-w-full lg:w-[800px] pt-32 pb-16">
        <Comment />
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>