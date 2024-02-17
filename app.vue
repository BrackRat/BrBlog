<template>
  <div class="bg-[#0F1213]">
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

@font-face {
  font-family: 'FrankRuhlLibre';
  src: url('/fonts/FrankRuhlLibre-VariableFont_wght.ttf') format('ttf');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>