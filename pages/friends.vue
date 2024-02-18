<script setup>
import FirendCard from "~/components/FirendCard.vue";

const friends = [
  {
    name:"GZTime",
    avatar:"https://cdn.gzti.me/avatar/GZTime_2021.png",
    screenshot:"https://cdn.liil.cc/2024/02/18/65d1dc965f92d.jpg?x-oss-process=style/load",
    link:"https://blog.gztime.cc/"
  },
  {
    name:"极星网–博客论坛",
    avatar:"https://www.jixing.one/logo.php",
    screenshot:"https://cdn.liil.cc/2024/02/18/65d1e27138943.jpg?x-oss-process=style/load",
    link:"https://www.jixing.one/"

  },
  {
    name:"7gugu’s Blog",
    avatar:"https://7gugu.com/wp-content/uploads/2021/07/favicon.png",
    screenshot:"https://cdn.liil.cc/2024/02/18/65d1e33fc3284.jpg?x-oss-process=style/load",
    link:"https://www.7gugu.com/"

  },
  {
    name:"Muidar's Site",
    avatar:"https://muidar.com/wp-content/uploads/2022/12/icmLogo.png",
    screenshot:"https://cdn.liil.cc/2024/02/18/65d1e33f5515c.jpg?x-oss-process=style/load",
    link:"https://muidar.com/"
  },
]

</script>

<template>
  <div class="min-h-screen flex flex-col justify-center  items-center  w-full pt-16 text-secondary">
    <ElegantTitle text="FRIENDS" />

    <div class="grid grid-cols-1 items-center pt-16 px-12 gap-y-14 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12 ">
      <FirendCard  :name="friend.name" :avatar="friend.avatar" :screenshot="friend.screenshot" :link="friend.link"  v-for="friend in friends"/>
    </div>

    <div class="w-4/5 max-w-full lg:w-[800px] pt-32 pb-16">
      <Comment  />
    </div>
  </div>
</template>

<style>

</style>