<template>
  <div class="flex flex-col w-full h-full relative bg-noise">
    <div v-if="!checkSupportBrowser()">
      <UnSupportBrowser  class="w-full z-50"/>
    </div>
    <navbar class="fixed top-0 left-0 w-full nav-border z-50"></navbar>
    <NuxtPage class="relative z-20"/>
    <brFooter class="relative z-50"/>
  </div>
</template>

<script setup lang="ts">
function isChromeBased() {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.indexOf('chrome') > -1 || userAgent.indexOf('chromium') > -1;
}

function isWebKitBased() {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.indexOf('applewebkit') > -1;
}


function checkSupportBrowser(): boolean {
  return isChromeBased() || isWebKitBased()
}
</script>

<style>
@import "./assets/main.css";

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.nav-border {
  opacity: 1;
  background: rgba(15, 18, 19, 1);
  border-bottom: 1px solid rgba(194, 78, 19, 0.5);
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
  background-image: url('/images/noise.png');
  background-repeat: repeat;
  opacity: 0.08;
  z-index: 0;
}

</style>