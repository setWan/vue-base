import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const asyncRoutes = [];
function importAll (r) {
  r.keys().forEach((key) => asyncRoutes.push(r(key).default));
}
importAll(require.context('.', false, /\.route\.js/));

export const constantRoutes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
      icon: ''
    },
    component: () => import('@/views/Index')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      icon: ''
    },
    component: () => import('@/views/Login')
  },
  {
    path: '*',
    component: () => import('@/views/Error/404.vue')
  }
]

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
