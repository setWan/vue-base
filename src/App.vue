<template>
  <div id="app"
       class="bgVar"
       :style="{ '--theme-color': mainColor }">
    <router-view />
    <!-- <div v-html="changeClass"></div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      originalStylesheetCount: -1
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(document.styleSheets.length)
      this.originalStylesheetCount = document.styleSheets.length
    });
  },
  computed: {
    mainColor () {
      return this.$store.getters.mainColor
    },
    // fontSize () {
    //   return this.$store.getters.mainSize + 'px'
    // },
    // fontColor () {
    //   return this.$store.getters.fontColor
    // },
    changeClass () {
      let { mainSize, fontColor } = this.$store.getters
      return `<style type="text/css">.color{color: ${fontColor} !important}#app .fontSize{font-size: ${mainSize}px !important}</style>`
    }
  },
  created () {
    // document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
  }
}
</script>

<style lang="scss">
.bgVar {
  background-color: var(--theme-color);
}
</style>
