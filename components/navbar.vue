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
      <div :class="item.route === route.path ? 'btn-nav-active' : 'btn-nav'">
        <NuxtLink :to="item.route">{{ item.title }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-nav {
  @apply text-slate-500 hover:text-slate-900 font-bold hover:cursor-pointer;
}
.btn-nav-active {
  @apply text-slate-900 hover:text-slate-900 font-bold hover:cursor-pointer;
}
</style>
