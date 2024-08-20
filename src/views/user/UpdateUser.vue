<script lang="ts" setup>
import DetailUserInfo from './DetailUserInfo.vue'
import { updateUser } from '@/api';

const save = async () => {
    console.log('保存')
    // const res = await updateUser()
  
}
</script>

<template>
  <DetailUserInfo :disabled="false"></DetailUserInfo>
  <div class="opt-buttion">
    <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>

<style scoped>
.opt-buttion {
  display: flex;
  justify-content: center;
}
</style>
