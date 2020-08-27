import customer from './customer'
import device from './device'

const asyncRouter = [
  {
    path: '/home',
    component: () => import('@/views/common/home'),
    name: 'home',
    meta: { title: '首页' }
  },
  ...customer,
  ...device
]

export {
  asyncRouter
}
