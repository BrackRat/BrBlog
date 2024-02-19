<script setup>
import FriendCard from "~/components/FriendCard.vue";
import {checkSupportBrowser} from "~/composables/supportCheck.ts";

// const friends = [
//   {
//     name:"GZTime",
//     avatar:"https://cdn.gzti.me/avatar/GZTime_2021.png",
//     screenshot:"https://static.brackrat.com/blog/2024/02/d40e530a416381926a37c2909cc462a8.png",
//     link:"https://blog.gztime.cc/"
//   },
//   {
//     name:"极星网–博客论坛",
//     avatar:"https://www.jixing.one/logo.php",
//     screenshot:"https://static.brackrat.com/blog/2024/02/40f398429bf22a37a5ac7fdb33fd2697.png",
//     link:"https://www.jixing.one/"
//
//   },
//   {
//     name:"7gugu’s Blog",
//     avatar:"https://7gugu.com/wp-content/uploads/2021/07/favicon.png",
//     screenshot:"https://static.brackrat.com/blog/2024/02/a8189537e2d5e00b9d726eb8a3e3c49e.png",
//     link:"https://www.7gugu.com/"
//
//   },
//   {
//     name:"Muidar's Site",
//     avatar:"https://muidar.com/wp-content/uploads/2022/12/icmLogo.png",
//     screenshot:"https://static.brackrat.com/blog/2024/02/69985f644c91a12e530b1acbacba59a8.png",
//     link:"https://muidar.com/"
//   },
// ]\

const loading = ref(false)

const friends = ref([])

async function fetchFriends() {
  loading.value = true
  try {
    const response = await useFetch(`/api/friend`, {
      method: 'GET',
    })
    if (response.data.value && response.data.value.length >= 0) {
      friends.value = response.data.value
      loading.value = false
      return true
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return false
  }
  return false
}


fetchFriends()
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center w-full pt-24 text-secondary">
    <!-- 弥散光 -->
    <div v-if="checkSupportBrowser()" class="w-full h-full overflow-hidden absolute">
      <div
          class="top-[100px]  lg:left-[800px] rotate-[30deg] w-[200px] h-[620px] blur-[200px] absolute  bg-primary -z-50">
      </div>
    </div>


    <div class="relative w-full h-full flex flex-col justify-center items-center">
      <ElegantTitle text="FRIENDS" />


      <div class="flex flex-col items-center pt-16 px-12 gap-y-14 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
        <FriendCard v-for="friend in friends" :key="friend.name" :name="friend.name" :avatar="friend.avatar" :screenshot="friend.screenshot" :link="friend.link" />
      </div>

      <div class="w-4/5 max-w-full lg:w-[800px] pt-32 pb-16">
        <Comment />
      </div>
    </div>




  </div>
</template>


<style>

</style>