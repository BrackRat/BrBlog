<script setup lang="ts">

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  shadow_x: {
    type: String,
    required: true,
  },
  shadow_y: {
    type: String,
    required: true,
  },
  rounded: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col items-center">
    <ShadowImage :image="image" :shadow_x="shadow_x" :shadow_y="shadow_y"
                 :height="height" :width="width" :rounded="rounded"/>

    <div class="text-content pt-8 text-xl ">
      {{ text }}
    </div>
  </div>
</template>

<style scoped>

</style>