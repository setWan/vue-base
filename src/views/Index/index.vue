<template>
  <div>
    demo--Index
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      ipAddres: ''
    };
  },
  created () {
    console.log('当前的环境是', process.env.VUE_APP_ENV)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>