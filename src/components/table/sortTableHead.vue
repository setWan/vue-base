<template>
  <el-dropdown :hide-on-click="false"
               class="table-head-dropdown"
               trigger="click">
    <el-tooltip effect="dark"
                content="表头定制"
                placement="top">
      <i class="el-icon-sort"></i>
    </el-tooltip>
    <el-dropdown-menu class="head-list"
                      :style="{ width: width ? width + 'px' : false }"
                      slot="dropdown">
      <div class="dropdown-header">
        <el-checkbox label="all"
                     :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">列排序</el-checkbox>
        <el-button type="text"
                   @click="initData(true)">默认</el-button>
      </div>
      <el-checkbox-group ref="checkContent"
                         v-model="checkList"
                         @change="handleCheckItemChange">
        <el-dropdown-item v-for="item in copyHeader"
                          :key="'head_' + item.label">
          <el-checkbox :label="item.prop">{{ item.label }}</el-checkbox>
        </el-dropdown-item>
      </el-checkbox-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'sortTableHead',
  props: {
    // 原始数据
    origHeader: {
      type: Array,
      default () {
        return []
      }
    },
    // 返回处理过的表头
    newHeader: {
      type: Array,
      default () {
        return []
      }
    },
    // 初始化表头数据
    initSelect: {
      type: Array
    },
    /**
     * 自定义下拉列表的宽度
     */
    width: {
      type: Number
    }
  },
  data () {
    return {
      checkAll: true, // 是否全选
      isIndeterminate: false, // 全选按钮的第三个状态（减号
      sortable: null, // 拖动排序插件
      checkList: [], // 选中的header列表
      copyHeader: [] // header列表
    }
  },
  watch: {
    /**
     * checkbox改变的时候更新header
     */
    checkList (val) {
      this.handHeaderList()
    }
  },
  /**
   * dom挂载完毕，初始化数据
   */
  mounted () {
    this.$nextTick(_ => {
      this.initHeader()
    })
  },
  methods: {
    /**
     * 初始化
     */
    async initHeader () {
      // 初始化数据
      this.initData()

      let $dom = await this.getDom(this.$refs.checkContent)
      let el = $dom.$el
      // 初始化拖动
      // let el2 = this.$refs.checkContent.$el
      // let el = document.querySelector('.checkContent')
      this.sortable = Sortable.create(el, {
        animation: 250,
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '') // 火狐浏览器bug
        },
        onEnd: ({ oldIndex, newIndex }) => {
          // 交换header数据
          this.copyHeader.splice(newIndex, 0, ...this.copyHeader.splice(oldIndex, 1))

          // 改变key，解决表头不更新BUG
          this.copyHeader[oldIndex].key = +new Date() + this.copyHeader[oldIndex].prop
          this.copyHeader[newIndex].key = +new Date() + this.copyHeader[newIndex].prop

          // 刷新表头数据
          this.handHeaderList()
        }
      })
    },
    /**
     * 获取Dom元素
     */
    getDom ($dom) {
      return new Promise((resolve, reject) => {
        let timer = setInterval(_ => {
          if ($dom) {
            clearInterval(timer)
            resolve($dom)
          }
        }, 200)
      })
    },
    /**
     * 初始化数据
     * e => 用于判断是否是点击初始化按钮
     */
    initData (e) {
      // 拷贝原始表头数据
      this.copyHeader = this.origHeader.map(item => {
        item.key = +new Date() + item.prop
        return item
      })
      // 判断选中缓存数据还是默认数据
      if (this.initSelect && this.initSelect.length > 0 && !e) {
        this.checkList = this.initSelect.map(item => item.prop)
      } else {
        this.checkList = this.copyHeader.map(item => item.prop)
      }

      // 判断全选复选框状态
      let checkLen = this.checkList.length
      let headerLen = this.copyHeader.length
      this.checkAll = checkLen === headerLen
      this.isIndeterminate = checkLen > 0 && checkLen < headerLen

      this.$emit('update:newHeader', this.copyHeader)
    },
    /**
     * 修改表头数据
     */
    handHeaderList () {
      let list = this.copyHeader.filter(item => this.checkList.indexOf(item.prop) >= 0)
      this.$emit('update:newHeader', list)
    },
    /**
     * 全选复选框钩子
     * 点击全选按钮时候全选数据或取消全选
     */
    handleCheckAllChange (val) {
      this.checkList = val ? this.copyHeader.map(item => item.prop) : []
      this.isIndeterminate = false
    },
    /**
     * 列表复选框的change钩子
     * 列表复选框改变的时候判断全选复选框的状态
     */
    handleCheckItemChange (arr) {
      let checkedCount = arr.length
      this.checkAll = checkedCount === this.copyHeader.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.copyHeader.length
    }
  }
}
</script>

<style lang="scss" scoped>
.table-head-dropdown {
  vertical-align: middle;
}
.head-list {
  margin-top: 0;
  overflow: auto;
  .dropdown-header {
    margin: 0 16px 10px;
    line-height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eaedf1;
    .el-checkbox:before {
      content: '';
      width: 16px;
      margin-right: 4px;
      display: inline-block;
    }
  }
  li .el-checkbox:before {
    content: '::';
    width: 16px;
    margin-right: 4px;
    color: #8a8e99;
    display: inline-block;
    text-align: center;
    cursor: all-scroll;
  }
  .el-dropdown-menu__item {
    padding: 0 16px;
  }
}
</style>
