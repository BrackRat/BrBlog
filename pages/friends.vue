<script setup>
import FirendCard from "~/components/FirendCard.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center  w-full pt-16 text-secondary">
    <ElegantTitle text="FRIENDS" />

    <div class="grid grid-cols-2 gap-12 pt-16" >
      <FirendCard name="GZTime" avatar="https://cdn.gzti.me/avatar/GZTime_2021.png" screenshot="https://cdn.liil.cc/2024/02/18/65d1dc965f92d.jpg?x-oss-process=style/load" />
      <FirendCard name="极星网–博客论坛" avatar="https://www.jixing.one/logo.php" screenshot="https://cdn.liil.cc/2024/02/18/65d1e27138943.jpg?x-oss-process=style/load" />
      <FirendCard name="7gugu’s Blog" avatar="https://7gugu.com/wp-content/uploads/2021/07/favicon.png" screenshot="https://cdn.liil.cc/2024/02/18/65d1e33fc3284.jpg?x-oss-process=style/load" />
      <FirendCard name="Muidar's Site" avatar="https://muidar.com/wp-content/uploads/2022/12/icmLogo.png" screenshot="https://cdn.liil.cc/2024/02/18/65d1e33f5515c.jpg?x-oss-process=style/load" />
    </div>

    <div class="w-[800px] pt-32 pb-16">
      <Comment  />
    </div>
  </div>
</template>

<style>

</style>