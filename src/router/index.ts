//通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'
import { GET_TOKEN } from '@/utils/token'
//创建路由器
const router = createRouter({
    //路由模式
    history: createWebHistory(),
    routes: constantRoute,
    //滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    },
})

let isAuthenticated = GET_TOKEN() ? true : false

router.beforeEach(async (to, from) => {
    if (
        // 检查用户是否已登录
        !isAuthenticated &&
        // ❗️ 避免无限重定向
        to.name !== 'login'
    ) {
        // 将用户重定向到登录页面
        return { name: 'login' }
    }
})

export default router
