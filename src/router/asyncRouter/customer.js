export default [
  {
    path: '/member/memberList',
    name: 'memberList',
    meta: {
      keepAlive: false,
      title: '用户列表'
    },
    component: () =>
        import(/* webpackChunkName: "member" */ '@/views/member/memberList.vue')
  },
  {
    path: '/member/memberImport',
    name: 'memberImport',
    meta: {
      keepAlive: false,
      title: '用户导入'
    },
    component: () =>
        import(/* webpackChunkName: "member" */ '@/views/member/memberImport.vue')
  }
]
