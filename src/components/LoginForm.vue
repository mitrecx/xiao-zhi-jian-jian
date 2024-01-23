<!-- eslint-disable vue/multi-word-component-names -->
// components/LoginForm.vue
<template>
  <div >
    <form @submit.prevent="loginF">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/utils/api'
const username = ref('')
const password = ref('')

async function loginF() {
  try {
    await login(username.value, password.value)
    // 登录成功后的处理，例如导航到其他页面
  } catch (error) {
    // 处理登录失败的情况，例如显示错误提示
    console.error('Login error:', error)
  }
}
</script>

<style scoped>

</style>
