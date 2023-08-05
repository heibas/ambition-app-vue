import axios from "axios";
import Cookies from "js-cookie";
import { Toast } from "vant";
import router from '../router/index'
import store from '../store/index'
const request = axios.create({
    baseURL: '/api',  // 注意！！ 这里是全局统一加上了 后端接口前缀 前缀，后端必须进行跨域配置！
    changeOrigin: true,
    timeout: 3600
})
// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let token = Cookies.get("TOKEN")
    if (token) {
        config.headers['TOKEN'] = token;  // 设置请求头
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        if (res.code !== 200) {
            Toast.fail(res.msg);
        }
        if (res.code == 405) {
            router.push("/login");
            store.commit('RESET_STATE');
            Cookies.set('TOKEN', "", -1);
            sessionStorage.clear();
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

