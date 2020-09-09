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
      <el-checkbox-group v-model="checkList"
                         @change="handleCheckItemChange">
        <p v-if="fixedLeft"
           class="drag-title">固定在左侧</p>
        <div ref="dragLeft">
          <el-dropdown-item class="drag"
                            v-for="item in leftHeader"
                            :key="'head_' + item.key">
            <el-checkbox :label="item.prop">{{ item.label }}</el-checkbox>
            <i class="el-icon-minus"
               @click="changeFixed(item)"></i>
            <i class="el-icon-bottom-right"
               @click="changeFixed(item, 'right')"></i>
          </el-dropdown-item>
        </div>

        <p v-if="fixedLeft || fixedRight"
           class="drag-title">不固定</p>
        <div ref="dragMiddle">
          <el-dropdown-item class="drag"
                            v-for="item in middleHeader"
                            :key="'head_' + item.key">
            <el-checkbox :label="item.prop">{{ item.label }}</el-checkbox>
            <i class="el-icon-bottom-left"
               @click="changeFixed(item, 'left')"></i>
            <i class="el-icon-bottom-right"
               @click="changeFixed(item, 'right')"></i>
          </el-dropdown-item>
        </div>

        <p v-if="fixedRight"
           class="drag-title">固定在右侧</p>
        <div ref="dragRight">
          <el-dropdown-item class="drag"
                            v-for="item in rightHeader"
                            :key="'head_' + item.key">
            <el-checkbox :label="item.prop">{{ item.label }}</el-checkbox>
            <i class="el-icon-bottom-left"
               @click="changeFixed(item, 'left')"></i>
            <i class="el-icon-minus"
               @click="changeFixed(item)"></i>
          </el-dropdown-item>
        </div>
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
      dragMiddle: null, // 拖动排序插件
      dragLeft: null,
      dragRight: null,
      checkList: [], // 选中的header列表
      finalHeader: [], // header列表
      middleHeader: [],
      leftHeader: [],
      rightHeader: []
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
  computed: {
    /**
     * 是否有固定左侧
     */
    fixedLeft () {
      return this.leftHeader.length > 0
    },
    /**
     * 是否有固定右侧
     */
    fixedRight () {
      return this.rightHeader.length > 0
    }
  },
  /**
   * dom挂载完毕，初始化数据
   */
  mounted () {
    this.$nextTick(_ => {
      this.initData()
    })
  },
  methods: {
    /**
     * 初始化数据
     * e => 用于判断是否是点击初始化按钮
     */
    initData (e) {
      // 拷贝原始表头数据
      this.finalHeader = this.origHeader.map(item => {
        item.key = +new Date() + item.prop
        item.fixed = false
        return item
      })

      // 初始化表头
      this.initHeaderData()

      // 判断选中缓存数据还是默认数据
      if (this.initSelect && this.initSelect.length > 0 && !e) {
        this.checkList = this.initSelect.map(item => item.prop)
      } else {
        this.checkList = this.finalHeader.map(item => item.prop)
      }

      // 判断全选复选框状态
      let checkLen = this.checkList.length
      let headerLen = this.finalHeader.length
      this.checkAll = checkLen === headerLen
      this.isIndeterminate = checkLen > 0 && checkLen < headerLen

      this.$emit('update:newHeader', this.finalHeader)
    },
    /**
     * 初始化拖动
     *  -文档 http://www.sortablejs.com/
     */
    async initSortable () {
      let arr = [
        { domName: 'dragMiddle', listName: 'middleHeader' },
        { domName: 'dragLeft', listName: 'leftHeader' },
        { domName: 'dragRight', listName: 'rightHeader' }
      ]
      while (arr.length > 0) {
        let { domName, listName } = arr.shift()
        let dragDom = await this.getDom(this.$refs[domName])
        this[domName] && this[domName].destroy()

        this[domName] = Sortable.create(dragDom, {
          draggable: '.drag',
          handle: '.drag',
          animation: 250,
          setData: function (dataTransfer) {
            dataTransfer.setData('Text', '') // 火狐浏览器bug
          },
          onEnd: ({ oldIndex, newIndex }) => {
            this.changeSortHeader(this[listName][oldIndex], this[listName][newIndex])
          }
        })
      }
    },
    /**
     * 拖动结束回调，处理数据
     */
    changeSortHeader (oldData, newData) {
      let oldIndex = this.finalHeader.findIndex(item => item.prop === oldData.prop)
      let newIndex = this.finalHeader.findIndex(item => item.prop === newData.prop)

      // 交换header数据
      let dateTime = +new Date()
      this.finalHeader[newIndex] = {
        ...oldData,
        key: dateTime + oldData.prop
      }
      this.finalHeader[oldIndex] = {
        ...newData,
        key: dateTime + newData.prop
      }

      // 刷新表头数据
      this.handHeaderList()
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
     * 初始化表头
     */
    initHeaderData () {
      this.middleHeader = []
      this.leftHeader = []
      this.rightHeader = []

      this.finalHeader.forEach(item => {
        if (item.fixed === 'left') {
          this.leftHeader.push(item)
        } else if (item.fixed === 'right') {
          this.rightHeader.push(item)
        } else {
          this.middleHeader.push(item)
        }
      })

      this.initSortable()
    },
    /**
     * 修改表头数据
     */
    handHeaderList () {
      let list = this.finalHeader.filter(item => this.checkList.indexOf(item.prop) >= 0)
      this.$emit('update:newHeader', list)
    },
    /**
     * 全选复选框钩子
     * 点击全选按钮时候全选数据或取消全选
     */
    handleCheckAllChange (val) {
      this.checkList = val ? this.finalHeader.map(item => item.prop) : []
      this.isIndeterminate = false
    },
    /**
     * 列表复选框的change钩子
     * 列表复选框改变的时候判断全选复选框的状态
     */
    handleCheckItemChange (arr) {
      let checkedCount = arr.length
      this.checkAll = checkedCount === this.finalHeader.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.finalHeader.length
    },
    /**
     * 改变固定位置
     */
    changeFixed (row, type) {
      let index = this.finalHeader.findIndex(item => item.prop === row.prop)
      this.finalHeader[index].fixed = type || false
      this.finalHeader[index].key = +new Date() + row.prop

      this.initHeaderData()
      // 刷新表头数据
      this.handHeaderList()
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
    .el-button {
      margin-left: 16px;
    }
  }
  .drag-title {
    font-size: 14px;
    padding-left: 36px;
    color: rgba(0, 0, 0, 0.45);
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
