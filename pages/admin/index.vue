<script setup lang="ts">

const router = useRouter()

async function navigateToArticle() {
  await router.push(`/admin/article`)
}

async function navigateToFriend() {
  await router.push(`/admin/friend`)
}
</script>

<template>
  <div class="flex font-noto-serif ">
    <div class="flex flex-col space-y-32 mb-32 lg:flex-row lg:space-y-0  lg:space-x-32 ">
      <ElegantWithTitle @click="navigateToArticle()" class="cursor-pointer hover:opacity-90 transition-all" text="Blogs" height="360px" width="300px" rounded="rounded-bl-[100px]"
                        image="https://static.brackrat.com/blog/2024/02/6333eb81557bcccef3f0987470fd630c.png"
                        shadow_x="-top-6" shadow_y="right-6"/>
      <ElegantWithTitle @click="navigateToFriend()" class="cursor-pointer hover:opacity-90 transition-all" text="Friends" height="360px" width="300px" rounded="rounded-tr-[100px]"
                        image="https://static.brackrat.com/blog/2024/02/1cd6c41f1a8869e28b360f9010402c69.png"
                        shadow_x="-top-6" shadow_y="left-6"/>

      <ElegantWithTitle class="cursor-pointer hover:opacity-90 transition-all" text="Settings" height="360px" width="300px" rounded="rounded-tl-[100px]"
                        image="https://static.brackrat.com/blog/2024/02/e6bd64bd9bd304cb772951c5768b3c06.png"
                        shadow_x="-top-6" shadow_y="left-6"/>
    </div>


  </div>
</template>

<style scoped>

</style>