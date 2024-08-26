//统一管理咱们项目用户相关的接口
import request from './request'
import * as t from './type'
import * as tuser from './type_user'

//登录接口
export const reqLogin = (data: t.LoginFormData) => request.post<t.CommonResponse<string>>("/v1/login", data)
//退出登录
export const reqLogout = () => request.post("/v1/logout")

// 用户管理
//新增用户
export const addUser = (data: tuser.AddUserRequest) =>
    request.post("/v1/user/add", data)
// 删除用户
export const deleteUser = (id: number) =>
    request.delete(`/v1/user/delete/${id}`)
//修改用户
export const updateUser = (data: tuser.UpdateUserRequest) =>
    request.put(`/v1/user/update`, data)
// 查询详情
export const detailUser = (id: string) =>
    request.get < t.CommonResponse<tuser.DetailUserResponse>>(`/v1/user/details/${id}`)
// 查询列表
export const pageUser = (data: tuser.PageUserRequest) =>
    request.post<t.CommonResponse<t.PageResponse<tuser.PageRes>>>("/v1/user/page", data)


