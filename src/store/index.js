/*
Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：
  1、应用层级的状态应该集中到单个 store 对象中。
  2、提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
  3、异步逻辑都应该封装到 action 里面。
只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。
对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    └── modules
        ├── user.js       # 用户模块
        └── permission.js # 权限模块
*/

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission
  }
})
