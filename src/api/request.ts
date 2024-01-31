//进行axios二次封装:使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router';
//第一步:利用axios对象的create方法,去创建axios实例(其他的配置:基础路径、超时的时间)
const request = axios.create({
  //基础路径
  // baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  baseURL: "http://localhost:8001", //基础路径上会携带/api
  timeout: 5000, //超时的时间的设置
  withCredentials: true,
  headers: {
    // 'X-Requested-With': 'X-Requested-With',
    'Content-Type': 'application/json'
  }
})
//第二步:request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
  // const userStore = useUserStore()
  // if (userStore.token) {
  //   config.headers.token = userStore.token
  // }
  //config配置对象,headers属性请求头,经常给服务器端携带公共参数
  //返回配置对象
  return config
})

//第三步:响应拦截器
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'session 已过期, 请重新登录'
        router.push({ name: 'login' }); 
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
//对外暴露
export default request
