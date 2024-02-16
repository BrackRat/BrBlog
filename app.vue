<template>
  <div class="bg-[#E2E3E5]">
    <navbar ></navbar>
    <NuxtPage />
    <brFooter />
  </div>
</template>

<script setup lang="ts">

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

</style>