<script setup lang="ts">

const props = defineProps({
  disabled: {
    type: Boolean,
  }
})

const style = computed(() => {
  if(!props.disabled){
    return "hover:cursor-pointer transition-all active:scale-95 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  }else{
    return "transition-all cursor-not-allowed flex w-full justify-center rounded-md bg-primary bg-opacity-70 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  }
})
</script>

<template>
  <div>
    <div :class="style"
        >
      <div class="flex justify-center items-center">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>