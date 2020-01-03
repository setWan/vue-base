<template>
  <div>
    <div>demo--Index</div>
    <div>
      <theme-color></theme-color>
    </div>
    <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <div style="margin: 20px 0">
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary"
                 plain>主要按钮</el-button>
      <el-button type="success"
                 plain>成功按钮</el-button>
      <el-button type="info"
                 plain>信息按钮</el-button>
      <el-button type="warning"
                 plain>警告按钮</el-button>
      <el-button type="danger"
                 plain>危险按钮</el-button>
    </div>

    <div>
      <el-button round>圆形按钮</el-button>
      <el-button type="primary"
                 round>主要按钮</el-button>
      <el-button type="success"
                 round>成功按钮</el-button>
      <el-button type="info"
                 round>信息按钮</el-button>
      <el-button type="warning"
                 round>警告按钮</el-button>
      <el-button type="danger"
                 round>危险按钮</el-button>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理"
                     name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理"
                     name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理"
                     name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿"
                     name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import themeColor from '@/components/ThemePicker'
export default {
  name: 'Index',
  data () {
    return {
      activeName: 'second',
      ipAddres: ''
    };
  },
  components: {
    themeColor
  },
  created () {
    console.log('当前的环境是', process.env.NODE_ENV)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>