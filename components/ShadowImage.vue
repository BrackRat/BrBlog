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
  <div class="relative">
    <div :class="`relative h-[${height}] w-[${width}]`">
      <nuxt-img :class="rounded + ' relative overflow-hidden h-full w-full object-cover bg-secondary'"
                :src="image">
      </nuxt-img>
    </div>
    <div
        :class="`${rounded} -z-10 absolute ${shadow_y} ${shadow_x} bg-transparent h-[${height}] w-[${width}]  outline-border`">
    </div>
  </div>

</template>

<style scoped>
.outline-border {
  opacity: 1;
  border: 1px solid rgba(194, 78, 19, 0.5);
}
</style>