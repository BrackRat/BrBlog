<script setup lang="ts">
const route = useRoute()

const switchRoutes = computed(() => {
  return [
    {
      'title':"Home",
      'route':"/"
    },
    {
      'title':"Blogs",
      'route':"/blog"
    },
    {
      'title':"Friends",
      'route':"/friends"
    },
    {
      'title':"About",
      'route':"/about"
    },
  ]
})

</script>

<template>
  <div class="flex p-4  flex-row space-x-4" >
    <div class="flex flex-grow"></div>

    <div class="flex" v-for="(item, index) in switchRoutes" :key="index">
      <div :class="item.route === route.path ? 'font-frank-ruhl-libre text-lg hover:cursor-pointer text-primary underline' : 'font-frank-ruhl-libre text-lg hover:cursor-pointer text-secondary  hover:text-primary transition-all'">
        <NuxtLink  :to="item.route">{{ item.title }}</NuxtLink>
      </div>
    </div>
    <div class="flex flex-grow"></div>
    <div class="justify-items-end">
      <NuxtLink class="-ml-4" to="https://www.travellings.cn/go.html"><Icon class="text-secondary text-opacity-70 " name="mingcute:train-2-line"></Icon> </NuxtLink>
    </div>
  </div>
</template>

<style scoped>


</style>
