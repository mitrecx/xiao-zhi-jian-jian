import { BasePageRequest } from './type'


// 新增用户请求参数类型
export interface AddUserRequest {
  loginName: string
  username: string
  password: string
  email: string
  phone: string
}


// 修改用户请求参数类型
export interface UpdateUserRequest {
  id: number
  loginName: string
  username: string
  password: string
  email: string
  phone: string
}

// 分页查询用户响应类型
export interface PageRes {
  userId: number
  loginName: string
  username: string
  email: string
  phone: string
  status: string
  deleted: boolean
}



// 查询用户响应类型
export interface DetailUserResponse {
  id: number
  loginName: string
  username: string
  email: string
  phone: string
  status: string
  deleted: boolean
  createTime: string
  updateTime: string
  lastLoginTime: string
}

export interface PageUserRequest extends BasePageRequest {
  loginName?: string
  username?: string
  email?: string
  phone?: string
  status?: string
  deleted?: boolean
}