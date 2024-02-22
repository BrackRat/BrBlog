<script setup>
import FriendCard from "~/components/FriendCard.vue";
import {checkSupportBrowser} from "~/composables/supportCheck.ts";

useSeoMeta({
  title: "BrackRat's Friends",
  ogTitle: "BrackRat's Friends",
  description: "BrackRat's Friends.",
  ogDescription: "BrackRat's Friends.",
  twitterCard: "summary_large_image",
});

const loading = ref(false)
const friends = ref([])

async function fetchFriends() {
  loading.value = true
  try {
    const response = await useFetch(`/api/friend/get`, {
      method: 'GET',
    })
    const {code, data} = response.data.value
    if (code === 200) {
      friends.value = data
      loading.value = false
      return true
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return false
  }
  return false
}

const md = "欢迎与你互换友链，记得先添加本站哦！\n" +
    "\n" +
    "- Name: 波西\n" +
    "- Link: https://blog.brackrat.com/\n" +
    "- Avatar: https://static.brackrat.com/icon.jpg\n" +
    "- Desc: 心有所向，日复一日。\n" +
    "\n" +
    "有点小小的要求：\n" +
    "\n" +
    "- 无违法内容\n" +
    "- HTTPS\n" +
    "- 有自己的内容\n" +
    "\n" +
    "申请时，请在评论中提供以下信息:\n" +
    "\n" +
    "- 名称\n" +
    "- 简介\n" +
    "- 头像链接\n" +
    "- 网站链接\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n"


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


    <div class="relative flex flex-col justify-center items-center">
      <AnimElegant>
        <ElegantTitle text="FRIENDS"/>
      </AnimElegant>

      <div v-if="friends.length <= 0" class="h-lvh">

      </div>


      <div class="flex flex-col items-center pt-16 px-12 gap-y-14 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
        <AnimElegant :delay="idx * 100" v-for="(friend, idx) in friends" :key="friend.name">
          <FriendCard :name="friend.name" :avatar="friend.avatar" :screenshot="friend.screenshot" :link="friend.link"/>
        </AnimElegant>
      </div>

      <div class="w-4/5 max-w-full lg:w-[800px] pt-24 pb-16">
        <AnimElegant v-if="friends.length > 0">
          <MDRender :content="md"/>
        </AnimElegant>
      </div>

      <div class="w-4/5 max-w-full lg:w-[800px] pt-14 pb-16">
        <Comment/>
      </div>
    </div>


  </div>
</template>


<style>

</style>