import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store/index'
import router from './router/index'
import {Notice} from 'view-design'

// 全局前置守卫
/*
  当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
  每个守卫方法接收三个参数：
    to: Route: 即将要进入的目标 路由对象
    from: Route: 当前导航正要离开的路由
    next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
      next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
      next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
      next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
      next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
*/
router.beforeEach((to, from, next) => {
  NProgress.start()
  const isLogin = localStorage.getItem('token_flag') || false
  if (isLogin) {
    if ((to.name === 'login')) {
      next()
      NProgress.done()
    } else {
      if (!store.state.permission.has) {
        const menus = JSON.parse(localStorage.getItem('menuList')) || []
        store.dispatch('generateRoutes', menus).then(res => {
          router.addRoutes(res)
          console.log(res)
          console.log(router)
          const redirect = decodeURIComponent(to.path)
          if (to.path === redirect) {
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          } else {
            // 跳转到目的路由
            next({ path: redirect })
          }
        }).catch(() => {
          Notice.error({
            title: '错误',
            desc: '请求用户信息失败，请重新登录'
          })
          next('/login')
        })
      } else {
        next()
      }
    }
  } else {
    if ((to.name === 'login')) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
