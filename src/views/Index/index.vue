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
    <div>
      <public-table :data-list="dataList"
                    :head-list="headList"
                    :has-oper="true"
                    :page="searchData.page"
                    :page-size="searchData.pageSize"
                    :page-count="searchData.pageCount"
                    @changePage="changePage"
                    @changePageSize="changePageSize">
        <template v-slot:operationLeft>
          <el-button type="text">左按钮</el-button>
        </template>
        <template v-slot:operationRight>
          <el-button type="text">右按钮</el-button>
        </template>
        <template v-slot:tableOperation="scoped">
          <el-button type="text"
                     @click="delData(scoped.row)">删除</el-button>
        </template>
      </public-table>
    </div>
    <div>
      <el-button type="button"
                 @click="stopRandom">点击</el-button>
      {{ballNumber}}
    </div>
    <div>
      <el-input v-model="socketPath"
                class="socketInput"></el-input>
      <el-button @click="socketConnect">连接</el-button>
    </div>
  </div>
</template>

<script>
import themeColor from '@/components/ThemePicker'
import socketIo from '@/utils/socket'

export default {
  name: 'Index',
  data () {
    return {
      activeName: 'second',
      ipAddres: '',
      searchData: {
        page: 1,
        pageSize: 10,
        pageCount: 100
      },
      dataList: [
        {
          name: 'miss',
          phone: '1221',
          address: '北京市',
          address1: '北京市1',
          address2: '北京市2'
        }
      ],
      headList: [
        {
          prop: 'index',
          label: '序号',
          type: 'index',
          indexAccum: true
        },
        {
          prop: 'name',
          label: '用户名'
        },
        {
          prop: 'phone',
          label: '电话'
        },
        {
          prop: 'address',
          label: '地址'
        },
        {
          prop: 'address1',
          label: '地址1'
        },
        {
          prop: 'address2',
          label: '地址2'
        },
        {
          prop: 'opertion',
          label: '操作',
          width: 100
        }
      ],
      ballNumber: '',
      timer: null,
      socketPath: 'https://www.aituoli.com'
    };
  },
  components: {
    themeColor
  },
  created () {
    console.log('当前的环境是', process.env.NODE_ENV)
  },
  methods: {
    /**
     * socket.io
     */
    socketConnect () {
      socketIo({
        prefix: this.socketPath
      })
      console.log(this.socket, this.socketPath)
    },
    delData (row) {
      console.log('del--->', row)
    },
    changePage (page) {
      this.searchData = {
        ...this.searchData,
        page
      }
    },
    changePageSize (pageSize) {
      this.searchData = {
        ...this.searchData,
        page: 1,
        pageSize
      }
    },
    /**
     * 随机生成彩票
     */
    startRandom () {
      this.timer = setInterval(_ => {
        this.randomNumber()
      }, 100)
    },
    stopRandom () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      } else {
        this.startRandom()
      }
    },
    randomNumber () {
      let arr = []
      while (arr.length < 6) {
        let ball = this.getBall(33)
        if (!arr.includes(ball)) {
          arr.push(ball)
        }
      }
      let blueBall = this.getBall(16)
      arr.sort((a, b) => a - b)
      this.ballNumber = arr.join(',') + '  ' + blueBall
    },
    getBall (max) {
      return Math.ceil(Math.random() * max)
    }
  }
}
</script>

<style lang="scss" scoped>
.socketInput {
  width: 200px;
}
</style>