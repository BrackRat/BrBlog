<script setup lang="ts">

</script>

<template>
  <div>
    <div
        class="hover:cursor-pointer transition-all active:scale-95 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <div class="flex justify-center items-center">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>