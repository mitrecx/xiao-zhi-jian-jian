<template>
  <div>
    <div class="shortcut-container">
      <div class="shotcut">
        <div class="logo-box">
          <router-link to="/">
            <img src="/src/assets/images/xianxianlog.jpg" alt="xianxian logo" class="logo" />
          </router-link>
        </div>

        <div class="search">
          <input type="text" placeholder="搜索" />
          <button>go</button>
        </div>
        <div class="user-box">
          <div class="user">用户</div>
          <div class="logout" @click="logoutAction">退出登录</div>
        </div>
      </div>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user'
const router = useRouter()
let useStore = useUserStore()
const logoutAction = async () => {
  await useStore.userLogout()
  router.push('/login')
}
</script>

<style scoped>
.shortcut-container {
  height: 50px;
}

.shotcut {
  position: fixed;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  background-color: #a3cbff;
}
.logo-box {
  margin-left: 20px;
}
.logo {
  width: 60px;
  height: 50px;
}

.search {
  display: flex;
  justify-content: space-between;
  margin-left: 40px;
  padding-left: 20px;
  line-height: 50px;
  width: 600px;
  border-radius: 25px;
  background-color: pink;

  font-size: 25px;
}

.search input {
  border-style: none;
  height: 50px;
  width: 100%;
  /* 透明 */
  background-color: transparent;
}
.search button {
  margin-right: 20px;
  border-radius: 25px;
  width: 50px;
  height: 50px;

  text-align: center;
  font-size: 25px;
  background-color: #fff;
  background-color: transparent;
}
.search button:hover {
  background-color: #fff;
}
.user-box {
  display: flex;
  justify-content: end;
  width: 500px;
}
.user-box .user {
  margin-left: 20px;
  margin-right: 20px;
  padding: 5px 10px;
  line-height: 40px;
  font-size: 20px;
  background-color: #21e19b;
}

.user-box .logout {
  margin-right: 20px;
  padding: 5px 10px;
  line-height: 40px;
  font-size: 20px;
  background-color: #e95e5e9c;
}
</style>
