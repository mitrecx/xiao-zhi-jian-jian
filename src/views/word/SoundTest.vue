<!-- const audioUrl = 'https://mitrecx.top:8001/v1/english2-word/download/ability' -->
<template>
  <div>
    <h1>音频播放器</h1>
    <button @click="playAudio">播放音频</button>
    <button @click="pauseAudio">暂停音频</button>
    <button @click="stopAudio">停止音频</button>
  </div>
</template>

<script setup lang="ts">
import { Howl } from 'howler'
import { ref, onMounted } from 'vue'

const sound = ref()

onMounted(() => {
  sound.value = new Howl({
    src: ['/Users/chenxing/Downloads/word_audio/ability.mp3'],
    
  })
})

function playAudio() {
  console.log(sound.value);
  
  sound.value.play()
}

function pauseAudio() {
  sound.value.pause()
}
function stopAudio() {
  sound.value.stop()
}
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
