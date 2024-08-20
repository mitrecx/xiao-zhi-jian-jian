<script lang="ts" setup>
import DetailUserInfo from './DetailUserInfo.vue'
</script>

<template>
  <DetailUserInfo :disabled="true"></DetailUserInfo>
  <div class="opt-buttion">
    <el-button type="primary" @click="$router.go(-1)">返回</el-button>
  </div>
</template>

<style scoped>
.opt-buttion {
  display: flex;
  justify-content: center;
}
</style>
