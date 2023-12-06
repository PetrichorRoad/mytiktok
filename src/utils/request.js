import axios from 'axios';
import useMyInfoStore from '@/store/myinfo';
// let myInfoStore = useMyInfoStore()
// import { ElMessage } from 'element-plus';
const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

request.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // 哈哈！不知道啥情况，必须写在这
    // let userStore = useUserStore()
    let token = sessionStorage.getItem('token')
    // // 请求拦截器注入对象，内置对象有个header属性，设置请求头
    if (token) {
        config.headers.Authorization = token
    }
    return config
})

request.interceptors.response.use((response) => {
    // 传入成功回调，一般用于简化数据
    return response.data
}, (error) => {
    console.log(error);
    if (error.message === 'timeout of 5000ms exceeded') {
        // ElMessage({
        //     type: error,
        //     message: '网络不佳'
        // })
        console.log('网络不佳');
    }
    // 失败回调，处理http网络错误
    let status = error.response.status


    // switch (status) {
    //     case 404:
    //         // ElMessage({
    //         //     type: error,
    //         //     message: error.message
    //         // })
    //         break;
    //     case 500 | 501 | 502 | 503 | 504:
    //         // ElMessage({
    //         //     type: error,
    //         //     message: '服务器挂掉了'
    //         // })
    //         break;
    //     case 401:
    //         // ElMessage({
    //         //     type: error,
    //         //     message: '参数有误'
    //         // })
    //         break;
    //     case 400:
    //         ElMessage({
    //             type: error,
    //             message: '没有权限'
    //         })
    //         break;
    // }

    return Promise.reject(new Error(error.message))
})

export default request