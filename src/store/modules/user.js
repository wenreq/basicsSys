import {login} from '../../request/Api/login'
import {Message} from 'view-design'

// state
// state提供数据源，所有的共享数据都要放到store的state中进行存储。
const state = {
  token: '',
  user: {},
  menuList: []
}
/** mutations用于变更store中的数据。
* 1）只能通过mutations变更store中的数据，不可以直接操作store中的数据。
* 2）通过这个方式操作操作起来稍微有点繁琐，但是可以集中监控所有数据的变化。
* */
const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setUserInfo (state, info) {
    state.user = JSON.parse(info)
  },
  setMenuList (state, menu) {
    state.menuList = JSON.parse(menu)
  }
}
/**
 * Action用于处理异步任务
 * 如果通过异步操作数据必须使用Action,不能使用mutations，但是在Action中还是通过出发Mutation的方式间接变更数据。
*/
const actions = {
  loginHandle (content, params) {
    return new Promise((resolve, reject) => {
      login(params).then(res => {
        const result = res.result
        localStorage.setItem('token', result.user.token)
        localStorage.setItem('token_flag', Boolean(result.user.token))
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('menuList', JSON.stringify(result.menus))
        content.commit('setToken', result.user.token)
        content.commit('setUserInfo', JSON.stringify(result.user))
        content.commit('setMenuList', JSON.stringify(result.menus))
        Message.success('登录' + res.msg)
        resolve(result)
      }).catch(error => {
        reject(error)
      })
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
