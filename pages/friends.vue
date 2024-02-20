<script setup>
import FriendCard from "~/components/FriendCard.vue";
import {checkSupportBrowser} from "~/composables/supportCheck.ts";

const loading = ref(false)
const friends = ref([])

async function fetchFriends() {
  loading.value = true
  try {
    const response = await useFetch(`/api/friend/get`, {
      method: 'GET',
    })
    const { code, data } = response.data.value
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