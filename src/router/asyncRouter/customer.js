export default [
  {
    path: '/member/memberList',
    name: 'memberList',
    meta: {
      keepAlive: false,
      title: '会员列表'
    },
    component: () =>
        import(/* webpackChunkName: "member" */ '@/views/member/memberList.vue')
  }
]
