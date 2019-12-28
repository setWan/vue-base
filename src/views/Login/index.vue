<template>
  <div>
    Login
    <el-button @click="asyncAddRoute">异步添加Admin页面路由</el-button>
    <el-button @click="setStore">setStore {{ num }}</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addRoute } from '@/utils/asyncRoute.js'
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'num'
    ])
  },
  methods: {
    setStore () {
      this.$store.dispatch('user/changeTest', this.num)
    },
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
