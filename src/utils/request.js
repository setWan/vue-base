import axios from 'axios'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    // 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
    // config.headers['token'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJocXNodWp1IjoiaHR0cDpcL1wvNDcuOTMuMjEwLjc0OjgwODBcL2hxc2h1anVcLyIsInRvb2xzIjoiaHR0cHM6XC9cL3NtYXJ0bGl2ZS5oYW9xMzYwLmNvbVwvaHF0b29sc1wvIn0.P2Ob7ocs9HaNH-Da4yZ1N6V4YnUVNmkPKrPU-b7_sZQ"
    // }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // 处理统一错误
    if (res.code !== 20000) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // console.log('err' , error.response) // for debug
    return Promise.reject(error.response)
  }
)

export default service
