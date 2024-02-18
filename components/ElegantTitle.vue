<script setup lang="ts">

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="font-noto-serif flex text-secondary items-baseline">
    <div class="text-[72px]">
      {{ text.slice(0,1) }}
    </div>
    <div class="text-[48px]">
      {{  text.slice(1,text.length)  }}
    </div>
  </div>
</template>

<style scoped>

</style>