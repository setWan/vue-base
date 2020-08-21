<template>
  <div class="publicTable">
    <div class="opertion"
         v-if="hasOper">
      <div class="oper-left">
        <slot name="operationLeft"></slot>
      </div>
      <div class="oper-right">
        <slot name="operationRight"></slot>
        <span class="line"
              v-if="slots.operationRight"></span>
        <sort-table-head :orig-header="headList"
                         :new-header.sync="newHeader"
                         :init-select="initSelect"></sort-table-head>
      </div>
    </div>
    <div class="table-container">
      <el-table :data="dataList">
        <template v-for="column in tableHeader">
          <el-table-column :key="column.key || column.prop"
                           :prop="column.prop"
                           :label="column.label"
                           :width="column.width"
                           :formatter="column.formatter"
                           :sortable="column.sortable">
          </el-table-column>
        </template>
        <slot name="tableOperation"></slot>
      </el-table>
    </div>
    <pagination :page="page"
                :page-size="pageSize"
                :page-count="pageCount"></pagination>
  </div>
</template>

<script>
import sortTableHead from './sortTableHead'

export default {
  name: 'publicTable',
  components: {
    sortTableHead
  },
  props: {
    /**
     * 列表数据
     */
    dataList: {
      type: Array,
      default () {
        return []
      }
    },
    /**
     * 列表表头
     */
    headList: {
      type: Array,
      default () {
        return []
      }
    },
    /**
     * 是否显示按钮组
     */
    hasOper: {
      type: Boolean,
      default: false
    },
    /**
     * 当前页
     */
    page: {
      type: Number,
      default: 1
    },
    /**
     * 每页显示多少条
     */
    pageSize: {
      type: Number,
      default: 10
    },
    /**
     * 总数据条数
     */
    pageCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      newHeader: [],
      initSelect: []
    }
  },
  computed: {
    /**
     * 判断表头是否需要排序
     */
    tableHeader () {
      return this.hasOper ? this.newHeader : this.headList
    },
    /**
     * 插槽组
     */
    slots () {
      return this.$scopedSlots
    }
  }
}
</script>

<style lang="scss" scoped>
.publicTable {
  .opertion {
    display: flex;
    align-items: center;
    padding: 0 16px;
    .oper-left {
      flex: 1;
    }
    .oper-right {
      .line {
        margin: 0 16px;
        vertical-align: middle;
        border-left: 1px solid #eaedf1;
      }
    }
  }
}
</style>
