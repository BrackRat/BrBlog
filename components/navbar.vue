<script setup lang="ts">
const route = useRoute()

const switchRoutes = computed(() => {
  return [
    {
      'title':"Home",
      'route':"/"
    },
    {
      'title':"Blog",
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
  <div class="flex p-4 justify-center flex-row space-x-4">
    <div v-for="(item, index) in switchRoutes" :key="index">
      <div :class="item.route === route.path ? 'base-text text-primary underline' : 'base-text text-secondary hover:underline'">
        <NuxtLink  :to="item.route">{{ item.title }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base-text {
  @apply font-frank-ruhl-libre text-lg hover:cursor-pointer;
}

</style>
