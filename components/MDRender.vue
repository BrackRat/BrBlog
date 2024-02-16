<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const md = MarkdownIt()

md.use(await Shiki({
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  }
}))

const result = md.render(props.content)
</script>

<template>
  <div class="mb-20 mt-5 text-left">
    <article v-html="result" />
  </div>
</template>