import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './permission'
import './style/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import * as filters from './filters' // global filters

Vue.use(ElementUI)

// 添加全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
