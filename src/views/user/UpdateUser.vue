<script lang="ts" setup>
import DetailUserInfo from './DetailUserInfo.vue'
import { updateUser } from '@/api'

const save = async (userInfo: any) => {
  console.log(userInfo)
  console.log('保存')
  // const res = await updateUser()
  await updateUser(userInfo)

  // 把 DetailUserInfo 中的数据传给 updateUser
}
</script>

<template>
  <DetailUserInfo :disabled="false" v-slot="slotProps">
    <div class="opt-buttion">
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      <el-button type="primary" @click="save(slotProps.ui)">保存</el-button>
    </div>
  </DetailUserInfo>
</template>

<style scoped></style>
