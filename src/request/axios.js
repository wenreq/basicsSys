import axios from 'axios'// 引入axios
import router from '../router'

// 设置 replace 属性（默认值: false）的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。即使点击返回按钮也不会回到这个页面。
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath// 携带当前页面路由，以期在登录页面完成登录后返回当前页面
    }
  })
}

var instance = axios.create({timeout: 1000 * 12})

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  instance.defaults.baseURL = 'http://10.168.2.203:9093/bossApi'
} else if (process.env.NODE_ENV === 'debug') {
  instance.defaults.baseURL = 'http://10.168.2.203:9093/bossApi'
} else if (process.env.NODE_ENV === 'production') {
  instance.defaults.baseURL = 'http://boss.mymrmao.com/bossApi'
}

// post请求头的设置
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截
instance.interceptors.request.use(
  config => {
    // 每次发送请求之前判断localStore是否存在token
    // 如果存在，则统一在http请求的header中加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能是过期的，所以在相应拦截器中要对返回状态进行判断。
    const token = localStorage.getItem('token') || ''
    token && (config.headers.token = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应的拦截
instance.interceptors.response.use(
  response => {
    const code = response.data.code
    // 对状态码进行对应的处理
    if (code === 0) {
      return Promise.resolve(response)
    } else if (code === 20000 || code === 20001 || code === 20002) {
      // 20000：用户token为空 20001：用户信息为空 20002：登录失效，请重新登录
      // 清除token
      localStorage.removeItem('token')
      toLogin()
      return Promise.reject(response.data.msg)
    } else {
      if (response.data.msg) {
        return Promise.reject(response.data.msg)
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
