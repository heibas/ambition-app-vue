import request from "../utils/request";
//登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}
//获取登录信息
export function info() {
    return request({
        url: '/user/info',
        method: 'post'
    })
}
//获取验证码
export function code(data) {
    return request({
        url: '/user/code',
        method: 'post',
        data
    })
}
//注册账号
export function enroll(data) {
    return request({
        url: '/user/enroll',
        method: 'post',
        data
    })
}
//修改用户信息
export function userUpdate(data) {
    return request({
        url: '/user/userUpdate',
        method: 'post',
        data
    })
}