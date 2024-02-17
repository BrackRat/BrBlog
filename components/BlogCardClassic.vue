<script setup lang="ts">
import { defineProps, watch } from 'vue';

const props = defineProps({
  rounded: {
    type: String,
    required: true,
  },
  reverse: {
    type: String,
    required: true,
  },
})

watch(() => props.rounded, () => {
  // Do something when the `rounded` prop changes
})

watch(() => props.reverse, () => {
  // Do something when the `reverse` prop changes
})
</script>

<template>
  <div :class="(reverse === 'true' ? 'flex-row-reverse space-x-reverse ' : '') + ' py-16 flex space-x-32 justify-center w-full text-secondary font-noto-serif'">

    <!-- Cover -->
    <div class="flex relative h-[360px] w-[270px]">
      <div :class="rounded + ' absolute -top-6 left-6  bg-transparent  h-[360px] w-[270px]  outline-border'">
      </div>
      <nuxt-img :class="rounded + ' relative overflow-hidden h-full w-full object-cover bg-slate-400' "
                src="/images/20200311174352-5e69235813514.jpg">
      </nuxt-img>
    </div>

    <!--  Detail  -->
    <div class="flex flex-col">
      <div class="text-4xl font-[600]">
        {{rounded}}  {{reverse}}标题标题标题标题标题标题标题标题标题
      </div>
      <div class="flex space-x-4 opacity-50 pt-2 font-[600]">
        <div>
          2024-2-17
        </div>
        <div>
          32 Views
        </div>
      </div>
      <div class="text-lg font-[200] pt-4 w-[800px]">
        为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上绝大多数APP都有第三方分享的功能，它是内容分发的最有效途径，并且大大降低了企业的营销成本。用户主动点击分享 绝大多数APP都是在详情页等需要分享的页面放置一个分享按钮，由用户自行选择分享。这种情况下用户是否分享主要是取决于产品内容本身，比如内容有趣或是有用。
      </div>
      <div class="flex pt-16">
        <div class="flex px-14 py-2 transition-all  hover:bg-primary hover:bg-opacity-10  font-[500] justify-center items-center text-[24px] hover:cursor-pointer text-primary border-button">
          Navigate
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