<script setup lang="ts">
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const id = 'preview-only';

const text = props.content;
</script>

<template>
  <div  class="flex">
    <MdPreview preview-theme="github" :show-code-row-number="true" theme="dark" :editorId="id" :modelValue="text" />
  </div>
</template>

<style>
.md-editor-dark {
  --md-bk-color: rgba(0,0,0,10%) !important;
}
</style>