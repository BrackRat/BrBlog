<template>
  <div class="relative bg-noise">
    <navbar class="relative z-50"></navbar>
    <NuxtPage class="relative z-50"/>
    <brFooter class="relative z-50"/>
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

.bg-noise {
  background-color: #0F1213;
}

.bg-noise::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/public/images/noise.png');
  background-repeat: repeat;
  opacity: 0.08;
  z-index: 0;
}

</style>