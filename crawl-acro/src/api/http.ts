// src/api/http.ts
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

// 创建axios实例
const service: AxiosInstance = axios.create({
    baseURL: '/api', // 从环境变量获取基础URL
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 在这里可以添加token等请求头
        // if (store.getters.token) {
        //   config.headers['Authorization'] = `Bearer ${store.getters.token}`
        // }
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 在这里处理响应数据
        return response.data
    },
    (error: any) => {
        // 在这里处理错误
        return Promise.reject(error)
    }
)

export default service