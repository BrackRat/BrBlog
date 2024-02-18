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
})
</script>

<template>
  <div class="flex flex-col font-noto-serif text-2xl">
    <div class="flex space-x-4">
      <div class="flex w-[38px] h-[38px] ml-4 items-center justify-center">
        <nuxt-img class="rounded " :src="avatar"/>
      </div>
      <div>
        {{ name }}
      </div>
    </div>

    <a :href="link" target="_blank" class="transition-all active:scale-95 hover:cursor-pointer relative card-shadow mt-3 w-[600px] h-[200px] bg-content rounded-[14px] overflow-hidden">
      <div class="absolute z-10 card-shadow w-full h-full">
      </div>
      <nuxt-img class="relative  w-full h-full object-cover" :src="screenshot" />
    </a>
  </div>
</template>

<style scoped>
.card-shadow{
  background: linear-gradient(270deg, rgba(0, 0, 0, 0) 72.68%, rgba(194, 78, 19, 0.5) 100%);
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1), 0px 5px 10px  rgba(0, 0, 0, 0.2), 0px 15px 40px  rgba(0, 0, 0, 0.4);
}

</style>