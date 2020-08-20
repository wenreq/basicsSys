import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import login from '@/components/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('token') || ''
  // 先判断路由要跳转到哪？跳转登录页面且是登录状态
  if (to.name === 'login' && !isLogin) {
    next()
  }
  // 不先判断会报错 ：Maximum call stack size exceeded
  /* 分析报错原因：
      next()表示路由成功，直接进入to路由，不会再次调用route.beforeEach()
      next('/login')表示路由拦截成功，重定向值login，会再次调用route.beforeEach()
  */
  if (isLogin) {
    next()
  } else {
    next('/login')
  }
})

export default router
