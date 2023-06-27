//axios基础封装
import axios from 'axios';

const httpInstance = axios.create({
    //https://fc-mp-e800ac57-5bd6-416c-ae29-ef9a46343447.next.bspapp.com
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

//拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
})


export default httpInstance