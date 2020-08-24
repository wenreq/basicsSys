import customer from './customer'

const asyncRouter = [
  {
    path: '/home',
    component: () => import('@/views/common/home'),
    name: 'home',
    meta: { title: '首页' }
  },
  ...customer
]

export {
  asyncRouter
}
