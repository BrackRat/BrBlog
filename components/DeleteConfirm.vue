<script setup lang="ts">
const clickStop = ref(0)

const emits = defineEmits(['really']);

const reallyDelete = () => {
  emits('really');
};


function tryDelete(){
  clickStop.value++;
  if(clickStop.value === 2){
    reallyDelete()
  }
  setTimeout(() => {
    clickStop.value = 0;
  },3000)
}
</script>

<template>
  <div @click="tryDelete" class="flex justify-center hover:cursor-pointer text-primary w-8 h-8 items-center hover:bg-black hover:bg-opacity-10 rounded-full">
    <Icon v-if="clickStop === 0" name="mingcute:delete-2-line"/>
    <Icon v-else-if="clickStop === 1" name="mingcute:checks-line" />
  </div>
</template>

<style scoped>

</style>