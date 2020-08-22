import customer from './customer'

const asyncRouter = [
  {
    path: '/',
    component: () => import('@/components/Home'),
    name: 'home',
    meta: { title: '首页' }
  },
  {
    path: '/login',
    component: () => import('@/components/login'),
    name: 'login',
    meta: { title: '登录页' }
  },
  ...customer
]

export {
  asyncRouter
}
