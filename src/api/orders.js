import request from "../utils/request";
//支付订单
export function play(params, data) {
    return request({
        url: `/orders/play/${params}`,
        method: 'post',
        data
    })
}
//获取订单集合
export function getorderList(data) {
    return request({
        url: `orders/orderList/${data}`,
        method: 'get'
    })
}
//支付待付款状况
export function playZhi(params) {
    return request({
        url: `/orders/playZhi/${params}`,
        method: 'post'
    })
}
//修改订单状态
export function orderStare(params) {
    return request({
        url: `/orders/orderStare/${params}`,
        method: 'post'
    })
}
//取消订单
export function playExit(params) {
    return request({
        url: `/orders/playExit/${params}`,
        method: 'post'
    })
}
//查询订单
export function getOrder(params) {
    return request({
        url: `/orders/getOrder/${params}`,
        method: 'get'
    })
}