<template>
  <div
      v-motion
      :initial="initialProps"
      :visibleOnce="visibleOnce"
  >
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps} from 'vue';

const props = defineProps({
  initialY: {
    type: Number,
    default: 50
  },
  stiffness: {
    type: Number,
    default: 250
  },
  damping: {
    type: Number,
    default: 25
  },
  mass: {
    type: Number,
    default: 1.5
  },
  delay:{
    type:Number,
    default:100,
  }
});


const {initialY, stiffness, damping, mass, delay} = props;

const initialProps = ref({
  y: initialY,
  opacity: 0
});

const visibleOnce = ref({
  y: 0,
  opacity: 1,
  transition: {
    type: "spring",
    stiffness: stiffness,
    damping: damping,
    mass: mass,
    delay:delay
  }
})

</script>

<style scoped>
</style>
