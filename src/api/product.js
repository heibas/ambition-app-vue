import request from "../utils/request";
//查询商品
export function selProduct(data) {
    return request({
        url: '/product/listProduct',
        method: 'get',
        params: data
    })
}
//商品详情
export function productDetails(data) {
    return request({
        url: `/product/productDetails/${data}`,
        method: 'get'
    })
}
//获取商品的sku
export function productSku(data) {
    return request({
        url: `/product/productAttr/${data}`,
        method: 'get'
    })
}
//精品推荐
export function recommendation() {
    return request({
        url: '/product/recommendation',
        method: 'get'
    })
}
//搜索商品
export function listSeacher(data) {
    return request({
        url: `/product/listProduct/${data}`,
        method: 'get'
    })
}
//猜你喜欢
export function getLike() {
    return request({
        url: `/product/like`,
        method: 'get'
    })
}