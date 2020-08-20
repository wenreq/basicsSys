// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import store from './store/index.js'
import setStore from './store/setStore.js'

Vue.use(ViewUI)
Vue.config.productionTip = false
// 将判断空的函数注册全局
Vue.prototype.isNotEmpty = function (val) {
  if (val === null || val === undefined || val === '') {
    return false
  } else {
    return true
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created () {
    setStore()
  },
  components: { App },
  template: '<App/>'
})
