//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: string
  message: string
  ok: boolean
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}
