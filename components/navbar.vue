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
  <div class="flex p-4 justify-center flex-row space-x-4" >
    <div v-for="(item, index) in switchRoutes" :key="index">
      <div :class="item.route === route.path ? 'font-frank-ruhl-libre text-lg hover:cursor-pointer text-primary underline' : 'font-frank-ruhl-libre text-lg hover:cursor-pointer text-secondary  hover:text-primary transition-all'">
        <NuxtLink  :to="item.route">{{ item.title }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>


</style>
