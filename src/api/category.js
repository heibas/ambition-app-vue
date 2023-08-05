import request from "../utils/request";
export function selCategory(data) {
    return request({
        url: `/category/categorySel/${data}`,
        method: 'get'
    })
}