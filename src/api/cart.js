import request from "../utils/request";
export function add(data) {
    return request({
        url: '/cart/add',
        method: 'post',
        data
    })
}
export function cartNum() {
    return request({
        url: '/cart/cartNum',
        method: 'get',
    })
}
export function list() {
    return request({
        url: '/cart/list',
        method: 'get'
    })
}
export function playlist(data) {
    return request({
        url: `/cart/list/${data}`,
        method: 'get'
    })
}
export function updCart(param, data) {
    return request({
        url: '/cart/updCart/' + param,
        method: 'post',
        data
    })
}
export function delCart(data) {
    return request({
        url: '/cart/delCart/' + data,
        method: 'post'
    })
}