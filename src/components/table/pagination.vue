<template>
  <div class="pagination">
    <el-pagination v-if="hasPages"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page"
                   :page-size="pageSize"
                   :page-sizes="pageSizes"
                   :page-count="pageCount"
                   :layout="layout"
                   :total="pageCount"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
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
    },
    /**
     * 组件布局，子组件名用逗号分隔
     */
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data () {
    return {
      pageSizes: [10, 20, 50, 100]
    }
  },
  computed: {
    hasPages () {
      return this.pageCount / this.pageSize > 1
    }
  },
  methods: {
    handleSizeChange (size) {
      this.$emit('changePageIndex', size)
    },
    handleCurrentChange (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  text-align: right;
  padding-top: 16px;
}
</style>
