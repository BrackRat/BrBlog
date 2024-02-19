<script setup lang="ts">
import {checkSupportBrowser} from "~/composables/supportCheck";
import {useBlogStore} from "~/stores/blog";

const blogStore = useBlogStore()

const user = ref({
  username:"",
  password:""
})

const loading = ref(false)
const router = useRouter()
const msg = ref("")

async function login() {
  if(user.value.password !== "" && user.value.username !== "")
  try {
    const response = await $fetch(`/api/user/login`, {
      method: 'POST',
      body:user.value
    },)
    console.log(response)
    if (response.code === 200) {
      blogStore.token = `Bearer ${response.token}`
      await router.push({path: "/admin"})
      loading.value = false
      return true
    }else{
      loading.value = false
      msg.value = response.msg
      setTimeout(() => {
        msg.value = ""
      },3000)
    }
  } catch (error) {
    loading.value = false
    console.error('Error logging:', error)
    return false
  }
  return false
}

</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center w-full pt-24 text-secondary">
  <!-- 弥散光 -->
  <div v-if="checkSupportBrowser()" class="w-full h-full overflow-hidden absolute">
    <div
        class="top-[-100px]  lg:right-[400px] rotate-[30deg] w-[200px] h-[620px] blur-[200px] absolute  bg-primary -z-50">
    </div>
  </div>

  <div class="relative w-full h-full flex flex-col justify-center items-center">
    <ElegantTitle text="LOGIN" />

    <div class="min-h-screen">
      <div class="space-y-6 font-noto-serif pt-32">
        <div>
          <label for="Username" class="block text-sm font-medium leading-6 text-secondary">Username</label>
          <div class="mt-2">
            <input v-model="user.username" id="Username" name="username" class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-secondary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-secondary">Password</label>

          </div>
          <div class="mt-2">
            <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <button @click="login()" :disabled="loading" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
        <div class="flex justify-center">
          {{ msg}}
        </div>
      </div>


    </div>
  </div>
  </div>

</template>

<style scoped>

</style>