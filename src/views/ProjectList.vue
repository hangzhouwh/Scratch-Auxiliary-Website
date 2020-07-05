<template>
  <div>
    <el-tooltip class="item" content="双击对应项目打分" placement="right">
      <el-table :data="data.projects"
                style="width: 100%"
                @row-dblclick="onRowdblclick">
        <el-table-column prop="pid"
                         label="作品id"
                         width="180">
        </el-table-column>
      </el-table>
    </el-tooltip>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="this.data.page_total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'ProjectList',
    created () {
      this.getProjectList(1)
    },
    data () {
      return {
        data: {
          page_num: null,
          page_size: null,
          page_total: null,
          projects: []
        }
      }
    },
    methods: {
      getProjectList (page_num) {
        this.getRequest(`/project/projects/unmarked/${this.$store.getters.host}`, {
          page_num: page_num,
          page_size: 10
        }).then(resp => {
          if (resp) {
            this.data = resp.data
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      onRowdblclick (row, event, column) {
        this.$emit('openMarkDialog', row)
      },
      handleCurrentChange (val) {
        this.data.page_num = val
        this.getProjectList(val)
        console.log(`当前页码:${val}`)
        console.log(`总页数为:${this.data.page_total}`)
      },
    }
  }
</script>

<style scoped>

</style>
