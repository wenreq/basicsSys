import store from './index'

export default function setStore () {
  store.commit('setToken', localStorage.getItem('token'))
  store.commit('setUserInfo', localStorage.getItem('user'))
  store.commit('setMenuList', localStorage.getItem('menuList'))
}
