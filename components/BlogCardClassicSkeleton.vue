<script setup lang="ts">

</script>

<template>
  <div class="py-16 flex space-x-32 justify-center w-full text-secondary font-noto-serif'">

    <!-- Cover -->
    <div class="flex relative h-[360px] w-[270px]">
      <div class="relative h-[360px] w-[270px]">
        <div class="absolute -top-6 left-6  bg-transparent  h-[360px] w-[270px] rounded-tr-[100px] outline-border">
        </div>
        <div class="relative rounded-tr-[100px] overflow-hidden h-full w-full object-cover bg-primary opacity-20 ">
        </div>

      </div>
    </div>

    <!--  Detail  -->
    <div class="flex flex-col">
      <div class="text-4xl font-[600] rounded-xl w-[800px] h-14 bg-primary opacity-20">
      </div>
      <div class="flex space-x-4  mt-4 font-[600] h-8 rounded-xl bg-primary opacity-20">
      </div>
      <div class="text-lg font-[200] pt-4 w-[800px] h-64 rounded-xl mt-4 bg-primary opacity-20">
      </div>
      <div class="flex pt-4">
        <div class="flex h-16 w-48 justify-center items-center bg-primary opacity-20 rounded-xl">
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.border-button{
  border: 1px solid rgba(194, 78, 19, 1);
}

</style>