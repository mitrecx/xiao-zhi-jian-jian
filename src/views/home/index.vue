<template>
  <div>
    <h1>Welcome, {{ username }}!</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('cx')

const logout = () => {
  // 触发登出逻辑，可以调用后端API等
  console.log('log out!')
}
</script>