export default {
  path: '/admin',
  name: 'admin',
  meta: {
    title: 'admin',
    icon: '',
    roles: ['admin'] // you can set roles in root nav
  },
  component: () => import('@/views/Admin')
}