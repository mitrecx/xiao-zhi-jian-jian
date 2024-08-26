//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface LoginFormData {
  username: string
  password: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: string
  message: string
  ok: boolean
}
export interface CommonResponse<T> {
  code: string
  message: string
  data?: T
}

export interface PageResponse<T> {
  current: number
  pages: number
  size: number
  total: number
  records: T[]
}



//定义登录接口返回数据类型
export interface LoginResponseData extends CommonResponse<string> {
}

// 分页查询请求参数
export interface BasePageRequest {
  pageNumber: number
  pageSize: number
}
