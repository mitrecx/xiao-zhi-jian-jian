//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqLogout } from '@/api'
import type { LoginFormData } from '@/api/type'
import type { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { constantRoute } from '@/router/routes'

//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据地方
  state: () => {
    return {
      token: GET_TOKEN() as string | null, //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
      username: '',
      avatar: '',
      //存储当前用户是否包含某一个按钮
      buttons: [],
      authList: [],
    } as UserState
  },
  //异步|逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: LoginFormData) {
      //登录请求
      const result = await reqLogin(data)
      //登录请求:成功0000->token
      //登录请求:失败->登录失败错误的信息
      console.log(result)
      if (result.data.code == '0000') {
        if (result.data.data) {
          this.username = result.data.data.username
          this.authList = result.data.data.authVOList
          this.token = result.data.data.token
          //本地存储持久化存储一份
          SET_TOKEN(this.token)
        }
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },

    //退出登录
    async userLogout() {
      //退出登录请求
      const result: any = await reqLogout()
      if (result.status == 200 && result.data.code == '0000') {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        console.log("hello 3", result.data);
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
