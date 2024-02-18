<script setup lang="ts">
const props = defineProps({
  rounded: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  width: {
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
  image: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div :class="`relative h-[${height}] w-[${width}]`">
    <div :class="`${rounded} absolute ${shadow_y} ${shadow_x}  bg-transparent  h-[${height}] w-[${width}]  outline-border`">
    </div>
    <nuxt-img :class="rounded + ' relative overflow-hidden h-full w-full object-cover bg-secondary'"
              :src="image">
    </nuxt-img>
  </div>
</template>

<style scoped>

</style>