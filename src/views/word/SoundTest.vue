<template>
  <div>
    <audio ref="audio" controls :src="audioUrl" >
      Your browser does not support the audio element.
    </audio>
    
  </div>
</template>

<script setup lang="ts">

const audioUrl = 'http://139.196.20.110:8001/v1/english2-word/download/ability'

</script>
