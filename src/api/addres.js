import request from "../utils/request";
export function addOrUpdate(data) {
    return request({
        url: '/address/addOrUpdate',
        method: 'post',
        data
    })
}
export function del(data) {
    return request({
        url: `/address/del/${data}`,
        method: 'post'
    })
}
export function addredList() {
    return request({
        url: `/address/list`,
        method: 'get'
    })
}