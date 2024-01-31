<template>
  <div>
    <h1>Welcome!</h1>
    <button @click="logout">Logout</button>
    <p>{{ res }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHello, reqHello2, reqLogout } from '@/api'
import router from '@/router';

const res = ref('abc')
onMounted(async () => {
  const response1 = await reqHello()
  console.log(response1)
  res.value = response1

  // 在组件实例化后执行异步操作
  const response2 = await reqHello2()
  console.log(response2.data)
  console.log(response2.message)
})

const logout = async () => {
  // 调用后端的登出接口
  await reqLogout()

  // 跳转到登录页面
  router.push({ name: 'login' });
}
</script>
