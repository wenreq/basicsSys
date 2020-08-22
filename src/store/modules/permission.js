import { asyncRouter } from '@/router/asyncRouter/index'
import main from '@/views/common/layout.vue'

const mainRouters = {
  path: '/main',
  comments: main,
  redirect: {path: '/'},
  meta: {title: '主入口'},
  children: []
}

/*
  menuList 后端返回权限列表
  asyncRouter 本地列表
*/
function routerMath (menuList, asyncRouterList) {
  const routers = []
  function createRouter (menuList) {
    menuList.forEach(ele => {
      // 将子级的数据转成一级push路由列表里面
      if (ele.children && ele.children.length) {
        createRouter(ele.children)
      }
      const path = ele.routeUrl || ''
      asyncRouterList.find(i => {
        if (i.path === path) {
          i.meta.title = ele.name
          i.meta.pId = ele.pId
          i.meta.menuId = ele.id
          routers.push(i)
        }
      })
    })
  }
  // 将权限列表中的每一项path和本地路由匹配添加到新的数据中作为新的路由
  createRouter(menuList)
  return routers
}

// state提供数据源，所有的共享数据都要放到store的state中进行存储。
const state = {
  has: false,
  addRouter: [],
  asyncRouter: asyncRouter
}
/** mutations用于变更store中的数据。
* 1）只能通过mutations变更store中的数据，不可以直接操作store中的数据。
* 2）通过这个方式操作操作起来稍微有点繁琐，但是可以集中监控所有数据的变化。
* */
const mutations = {
  setHas (state) {
    state.has = true
  },
  setRouter (state, routers) {
    state.addRouter = routers
  }
}
/**
 * Action用于处理异步任务
 * 如果通过异步操作数据必须使用Action,不能使用mutations，但是在Action中还是通过出发Mutation的方式间接变更数据。
*/
const actions = {
  generateRoutes (context, menuList) {
    return new Promise((resolve) => {
      const accessedRouters = routerMath(menuList, context.state.asyncRouter)
      accessedRouters.push({
        path: '/error',
        name: 'error',
        components: () => import('@/views/common/error')
      })
      mainRouters.children = accessedRouters
      const routers = [
        mainRouters,
        {path: '*', redirect: {name: 'error'}}
      ]
      context.commit('setHas')
      context.commit('setRouter', routers)
      resolve(routers)
    })
  }
}

const getters = {

}

export default{
  state,
  mutations,
  actions,
  getters
}
