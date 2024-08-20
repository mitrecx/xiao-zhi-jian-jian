<template>
  <div v-html="renderedMarkdown"></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { marked } from 'marked'

interface Props {
  markdownText: string
}

// 使用 defineProps 并指定类型
const props = defineProps<Props>()

const renderedMarkdown = ref<string>('')

// 监听 markdownText 的变化并更新 renderedMarkdown
watch(
  () => props.markdownText,
  (newMarkdown) => {
    const html = marked(newMarkdown)
    console.log(html)
    renderedMarkdown.value = html
  },
  { immediate: true }
)
</script>
