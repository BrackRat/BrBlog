<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  screenshot: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  noLink: {
    type: Boolean
  },
  friendStatus: {
    type: Number
  }
})

const StatusMap = {
  0: {
    text: "Active",
    style: "bg-green-50 ring-green-600/20 text-green-700 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset"
  },
  1: {
    text: "Hide",
    style: "bg-indigo-200 ring-indigo-600/20 text-indigo-700 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset"
  },
}
</script>

<template>
  <div class="flex flex-col font-noto-serif text-2xl font-[500]">
    <div class="flex space-x-4 justify-between items-center">
      <div class="flex space-x-4 items-center">
        <div class="flex w-[38px] h-[38px] ml-4 items-center justify-center">
          <nuxt-img class="rounded " :src="avatar"/>
        </div>
        <div>
          {{ name }}
        </div>
      </div>
      <div v-if="noLink" class="align-middle pr-4">
        <span :class="StatusMap[friendStatus].style">{{ StatusMap[friendStatus].text }}</span>
      </div>
    </div>

    <a v-if="!noLink" :href="link" target="_blank"
       class="transition-all active:scale-95 hover:cursor-pointer relative card-shadow mt-3 max-w-full lg:w-[600px] lg:h-[200px] bg-content rounded-[14px] overflow-hidden">
      <div class="transition-all hover:opacity-80 absolute z-10 card-shadow w-full h-full">
      </div>


      <nuxt-img class=" relative  w-full h-full object-cover" :src="screenshot"/>
    </a>

    <div v-else
         class="transition-all active:scale-95 hover:cursor-pointer relative card-shadow mt-3 max-w-full lg:w-[600px] lg:h-[200px] bg-content rounded-[14px] overflow-hidden">
      <div class="transition-all hover:opacity-80 absolute z-10 card-shadow w-full h-full">
      </div>

      <nuxt-img class=" relative  w-full h-full object-cover" :src="screenshot"/>
    </div>


  </div>
</template>

<style scoped>
.card-shadow {
  background: linear-gradient(270deg, rgba(0, 0, 0, 0) 72.68%, rgba(194, 78, 19, 0.5) 100%);
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.2), 0px 15px 40px rgba(0, 0, 0, 0.4);
}

</style>