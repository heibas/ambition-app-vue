import request from "../utils/request";
export function addRecharge(data) {
    return request({
        url: `/consumerism/recharge`,
        method: 'post',
        data
    })
}
export function getRecharge() {
    return request({
        url: `/consumerism/getRecharge`,
        method: 'get'
    })
}