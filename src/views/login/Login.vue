<template>
  <div class="login_container">
    <el-row>
      <el-col :span="16" :xs="0"></el-col>
      <el-col :span="8" :xs="24">
        <!-- 登录的表单 -->
        <el-form :size="size" class="login_form" :model="loginForm" ref="loginForms">
          <h2>欢迎来到闲闲</h2>

          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              :size="size"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入用户相关的小仓库
import useUserStore from '@/stores/modules/user'
import { AxiosError } from 'axios'
let useStore = useUserStore()
//获取el-form组件
let loginForms = ref()
const size = ref('large')
//获取路由器
let $router = useRouter()
//路由对象
let $route = useRoute()
//定义变量控制按钮加载效果
let loading = ref(false)
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '1233' })
//登录按钮回调
const login = async () => {
  //保证全部表单相校验通过再发请求
  //加载效果:开始加载
  loading.value = true
  //点击登录按钮以后干什么?
  //通知仓库发登录请求
  //请求成功->首页展示数据的地方
  //请求失败->弹出登录失败信息
  try {
    //保证登录成功
    await useStore.userLogin(loginForm)
    //编程式导航跳转到展示数据首页
    // 判断登录的时候,路由路径当中是否有query参数，如果有就往query参数跳转，没有跳转到首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElNotification.closeAll()
    //登录成功加载效果也消失
    loading.value = false
  } catch (error) {
    if ((error as AxiosError).code != 'ERR_NETWORK') {
      //登录失败加载效果消息
      loading.value = false
      //登录失败的提示信息
      ElNotification({
        type: 'error',
        message: (error as Error).message
      })
    }
  }
}
</script>
<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/japanroad2.jpeg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 20vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
