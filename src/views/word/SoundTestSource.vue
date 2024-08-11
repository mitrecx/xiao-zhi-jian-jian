<!-- const audioUrl = 'https://mitrecx.top:8001/v1/english2-word/download/ability' -->
<template>
  <div>
    <audio ref="audioPlayer" v-if="audioUrl" :key="audioUrl" controls>
      <source :src="audioUrl" type="audio/mpeg" />
    </audio>
    <button @click="playByButton">按钮播放</button>
    <button @click="playByButton2">按钮播放2</button>
    <button @click="changeUrl">改变 url</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const audioUrl = ref<string>('https://mitrecx.top:8001/v1/english2-word/download/ability')
// 必须和模板里的 ref 同名
const audioPlayer = ref()

const changeUrl = () => {
  if (audioUrl.value.endsWith('ability')) {
    audioUrl.value = 'https://mitrecx.top:8001/v1/english2-word/download/brother'
  } else {
    audioUrl.value = 'https://mitrecx.top:8001/v1/english2-word/download/ability'
  }
}

const playByButton = () => {
  audioPlayer.value.play()
}

const playByButton2 = () => {
  const audio = new Audio(audioUrl.value)
  audio.play()
}
</script>
