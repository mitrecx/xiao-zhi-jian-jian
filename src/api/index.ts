//统一管理咱们项目用户相关的接口
import request from './request'
import type {
  loginFormData,
  loginResponseData,

} from './type'
//项目用户相关的请求地址
enum API {
  LOGIN_URL = '/v1/login',
  // USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/v1/logout',
}

//登录接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)

export const reqHello = () => request.get<string, any>('/v1/test/hello')
export const reqHello2 = () => request.get < { data: string, code: string, message: string }, any>('/v1/test/hello2')
