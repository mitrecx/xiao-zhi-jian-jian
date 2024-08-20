<template>
  <div>
    <h1>AddUser</h1>
    <!-- 登录名 -->
    <div class="attr">
      <span>登录名：</span>
      <el-input v-model="loginName" style="width: 240px" placeholder="Please input" />
    </div>

    <!-- 密码 -->
    <div class="attr">
      <span>密码：</span>
      <el-input
        type="password"
        v-model="password"
        style="width: 240px"
        placeholder="Please input"
      />
    </div>
    <div class="attr">
      <span>确认密码：</span>
      <el-input
        type="password"
        v-model="password"
        style="width: 240px"
        placeholder="Please input"
      />
    </div>
    <!-- 保存 -->
    <el-button type="primary" @click="add">Save</el-button>
    <!-- 取消 -->
    <el-button type="primary" @click="cancel">Cancel</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { addUser } from '@/api/index'
import { useRouter } from 'vue-router'

const loginName = ref('')
const password = ref('')

// 新增用户
const add = () => {
  addUser({
    loginName: loginName.value,
    username: '',
    password: password.value,
    email: 'string',
    phone: 'string'
  })
  router.push('/user')
}
// 路由
const router = useRouter()
// 取消新增
const cancel = () => {
  loginName.value = ''
  password.value = ''
  //  路由跳转到用户列表页面
  router.push('/user')
}
</script>

<style scoped>
.attr {
  margin: 20px;
}
</style>
