<script setup lang="ts">
import { defineProps, watch } from "vue";

const props = defineProps({
  rounded: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  shadow_x: {
    type: String,
    required: true,
  },
  shadow_y: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

watch([() => props.height, () => props.width], ([newHeight, newWidth]) => {
  // 在 height 或 width 改变时，手动触发样式的更新
  const outlineBorder = document.querySelector('.outline-border');
  if (outlineBorder) {
    outlineBorder.style.height = newHeight;
    outlineBorder.style.width = newWidth;
  }
});
</script>

<template>
  <div class="relative">
    <div :style="{ height: height, width: width }" class="relative">
      <nuxt-img :class="rounded + ' relative overflow-hidden h-full w-full object-cover bg-secondary'"
                :src="image">
      </nuxt-img>
    </div>
    <div
        :style="{ height: height, width: width, position: 'absolute',  }"
        :class="` ${rounded} ` + ` ${shadow_x} ` + ` ${shadow_y} ` + ' outline-border -z-10 bg-transparent'">
    </div>
  </div>
</template>

<style scoped>
.outline-border {
  opacity: 1;
  border: 1px solid rgba(194, 78, 19, 0.5);
}
</style>
