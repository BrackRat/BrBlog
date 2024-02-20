<script setup lang="ts">
import {useBlogStore} from "~/stores/blog";
import FriendCard from "~/components/FriendCard.vue";
import ElegantButton from "~/components/ElegantButton.vue";
import type {FriendDB} from "~/server/types/friend";
import DeleteConfirm from "~/components/DeleteConfirm.vue";

const router = useRouter()

async function backAdmin() {
  await router.push(`/admin`)
}

const friends = ref([])
const blogStore = useBlogStore()

async function fetchFriendsAll() {
  try {
    const response = await useFetch(`/api/friend/get`, {
      method: 'GET',
      params: {getAll: true},
      headers: {Authorization: blogStore.token}
    })
    const {code, data} = response.data.value
    if (code === 200) {
      friends.value = data
      return true
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return false
  }
  return false
}

const isEditModalOpen = ref(false);
const selectedFriend = ref({})

const editFriend = (friend: FriendDB | undefined) => {
  if (friend) {
    selectedFriend.value = friend
  } else {
    selectedFriend.value = {
      name: "",
      avatar: "",
      screenshot: "",
      link: "",
    }
  }
  isEditModalOpen.value = true
}

const modalClose = () => {
  isEditModalOpen.value = false
  selectedFriend.value = {}
}

const sending = ref(false)

async function saveFriend() {
  sending.value = true
  try {
    const response = await $fetch(`/api/friend/change`, {
      method: 'POST',
      headers: {Authorization: blogStore.token},
      body: selectedFriend.value
    })
    const {code} = response
    if (code === 200) {
      modalClose()
      console.log("Success")
      await fetchFriendsAll()
    } else {
    }
  } catch (error) {
    console.error('Error fetching article:', error)
  }
  sending.value = false
}

async function createFriend() {
  sending.value = true
  try {
    const response = await $fetch(`/api/friend/create`, {
      method: 'POST',
      headers: {Authorization: blogStore.token},
      body: selectedFriend.value
    })
    const {code} = response
    if (code === 200) {
      modalClose()
      await fetchFriendsAll()
      console.log("Success")
    } else {
    }
  } catch (error) {
    console.error('Error fetching article:', error)
  }
  sending.value = false
}

async function deleteFriend(id: number) {
  if(id && id > 0){
    sending.value = true
    try {
      const response = await $fetch(`/api/friend/delete`, {
        method: 'POST',
        headers: {Authorization: blogStore.token},
        body: {id: id}
      })
      const {code} = response
      if (code === 200) {
        modalClose()
        await fetchFriendsAll()
        console.log("Success")
      } else {
      }
    } catch (error) {
      console.error('Error fetching article:', error)
    }
    sending.value = false
  }
}


fetchFriendsAll()
</script>

<template>
  <div class="flex flex-col px-16 lg:px-32">

    <transition name="modal">
      <div v-show="isEditModalOpen"
           class="font-sans fixed bg-black bg-opacity-70 inset-0 flex justify-center items-center shadow-2xl z-50">
        <div class="flex flex-col bg-secondary p-8 rounded-md shadow-lg">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg text-primary font-black ">Edit Friend</h2>
            <DeleteConfirm v-if="selectedFriend.id !== undefined" @really="deleteFriend(selectedFriend.id)" />
          </div>
          <div>
            <div class="mb-4">
              <label class="block text-sm font-black text-gray-900">Name:</label>
              <input type="text" id="name" v-model="selectedFriend.name"
                     class="ring-primary focus:ring-2 focus:ring-primary mt-1 text-black  p-2 block w-full border border-primary rounded-md">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-black text-gray-900">Avatar:</label>
              <input type="text" id="avatar" v-model="selectedFriend.avatar"
                     class="ring-primary focus:ring-2 focus:ring-primary mt-1 text-black  p-2 block w-full border border-primary rounded-md">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-black text-gray-900">ScreenShot:</label>
              <input type="text" id="screenshot" v-model="selectedFriend.screenshot"
                     class="ring-primary focus:ring-2 focus:ring-primary mt-1 text-black  p-2 block w-full border border-primary rounded-md">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-black text-gray-900">Link:</label>
              <input type="text" id="link" v-model="selectedFriend.link"
                     class="ring-primary focus:ring-2 focus:ring-primary mt-1 text-black  p-2 block w-full border border-primary rounded-md">
            </div>
            <div>
              <label class="block text-sm font-black text-gray-900">Status:</label>
              <select id="status" name="status" v-model="selectedFriend.status"
                      class="ring-primary focus:ring-2 focus:ring-primary mt-1 text-black  p-2 block w-full border border-primary rounded-md">
                <option :value="0" class="bg-primary bg-opacity-20 ">Active</option>
                <option :value="1" class="bg-primary bg-opacity-20 ">Hide</option>
              </select>
            </div>

            <div class="flex pt-8 space-x-4 justify-end">

              <ElegantButton @click="modalClose">Cancel</ElegantButton>
              <ElegantButton v-if="selectedFriend.id === undefind" @click="createFriend()">New</ElegantButton>
              <ElegantButton v-else @click="saveFriend()">Save</ElegantButton>
            </div>
          </div>
        </div>
      </div>
    </transition>


    <div class="flex pt-8 justify-between items-center">
      <div @click="backAdmin" class=" w-24 hover:cursor-pointer hover:opacity-80 transition-all">
        <Icon class="mr-2" name="mingcute:arrow-left-line"/>
        Admin
      </div>

      <ElegantButton @click="isEditModalOpen = true">
        <Icon class="mr-4" name="mingcute:add-fill"/>
        New
      </ElegantButton>
    </div>

    <div class="flex mb-16 flex-col items-center pt-16 gap-y-14 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
      <div v-for="friend in friends">
        <FriendCard @click="editFriend(friend)" :no-link="true" :key="friend.name" :name="friend.name"
                    :avatar="friend.avatar" :screenshot="friend.screenshot"
                    :link="friend.link" :friend-status="friend.status"/>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>