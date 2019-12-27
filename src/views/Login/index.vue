<template>
  <div>
    Login
    <el-button @click="asyncAddRoute">异步添加Admin页面路由</el-button>
  </div>
</template>

<script>
import { addRoute } from '@/utils/asyncRoute.js'
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    async asyncAddRoute () {
      let response = {
        roles: [{
          path: '/admin',
          name: 'admin',
          meta: {
            title: 'admin',
            icon: '',
            roles: ['admin'] // you can set roles in root nav
          },
          fileSrc: 'Admin/index'
        }]
      }
      await addRoute(response.roles)
      this.$router.push({ path: '/admin' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
