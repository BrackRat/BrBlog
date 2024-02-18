<script setup lang="ts">
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const id = 'preview-only';
const text = props.content;
const scrollElement = document.documentElement;


</script>

<template>
  <div class="flex">
    <MdPreview :show-code-row-number="true" theme="dark" :editorId="id" :modelValue="text" />
<!--    <MdCatalog theme="dark" :editorId="id" :scrollElement="scrollElement" />-->
  </div>
</template>

<style>
.md-editor-dark {
  --md-bk-color: rgba(0,0,0,15%) !important;
}
</style>