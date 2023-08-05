import request from "../utils/request";
//获取记录
export function list(data) {
    return request({
        url: `/record/list/${data}`,
        method: 'get'
    })
}
//是否收藏
export function recordGet(data) {
    return request({
        url: `/record/get/${data}`,
        method: 'get'
    })
}
//取消收藏
export function del(data) {
    return request({
        url: `/record/del/${data}`,
        method: 'post'
    })
}
//添加记录
export function recordAdd(param, data) {
    return request({
        url: `/record/add/${param}`,
        method: 'post',
        data
    })
}
//批量删除
export function batch(data) {
    return request({
        url: `/record/batch/${data}`,
        method: 'post'
    })
}