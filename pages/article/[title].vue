<script setup lang="ts">

</script>

<template>
  <div>
    This is Article Page
    <p>{{ $route.params.title }}</p>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<style scoped>

</style>