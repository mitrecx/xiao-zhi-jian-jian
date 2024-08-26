<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { detailUser } from '@/api'
import { DetailUserResponse } from '@/api/type_user'

const props = defineProps<{ disabled: boolean }>()

const router = useRouter()
// 存储用户信息
const userInfo: DetailUserResponse = reactive({
  userId: 0,
  loginName: '',
  username: '',
  email: '',
  phone: '',
  status: '',
  createTime: '',
  updateTime: '',
  deleted: false,
  lastLoginTime: ''
})

// 查询用户详情
const getUserDetail = async () => {
  const response = await detailUser(router.currentRoute.value.params.id[0])
  console.log(response)
  if (response.status !== 200) {
    return
  }
  const ui = response.data.data
  if (ui !== null && ui !== undefined) {
    userInfo.userId = ui.userId
    userInfo.loginName = ui.loginName
    userInfo.username = ui.username
    userInfo.email = ui.email
    userInfo.phone = ui.phone
    userInfo.status = ui.status
    userInfo.createTime = ui.createTime
    userInfo.updateTime = ui.updateTime
    userInfo.deleted = ui.deleted
    userInfo.lastLoginTime = ui.lastLoginTime
  }
}

onMounted(() => {
  getUserDetail()
})
</script>

<template>
  <div class="item-container">
    <div class="item">
      <span>登录名：</span>
      <el-input :disabled="props.disabled" v-model="userInfo.loginName" style="width: 240px" />
    </div>
    <div class="item">
      <span>用户名：</span>
      <el-input :disabled="props.disabled" v-model="userInfo.username" style="width: 240px" />
    </div>
    <div class="item">
      <span>邮箱：</span>
      <el-input :disabled="props.disabled" v-model="userInfo.email" style="width: 240px" />
    </div>
    <div class="item">
      <span>手机：</span>
      <el-input :disabled="props.disabled" v-model="userInfo.phone" style="width: 240px" />
    </div>
    <div class="item">
      <span>状态：</span>
      <el-input :disabled="true" v-model="userInfo.status" style="width: 240px" />
    </div>
    <div class="item">
      <span>创建时间：</span>
      <el-input :disabled="true" v-model="userInfo.createTime" style="width: 240px" />
    </div>
    <div class="item">
      <span>更新时间：</span>
      <el-input :disabled="true" v-model="userInfo.updateTime" style="width: 240px" />
    </div>
    <div class="item">
      <span>是否删除：</span>
      <el-input :disabled="true" v-model="userInfo.deleted" style="width: 240px" />
    </div>
    <div class="item">
      <span>最后登录时间：</span>
      <el-input :disabled="true" v-model="userInfo.lastLoginTime" style="width: 240px" />
    </div>
    <slot text="greetingMessage" :ui="userInfo"></slot>
  </div>
</template>

<style scoped>
/* 版心居中 */
.item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item {
  margin: 8px;
}
</style>
