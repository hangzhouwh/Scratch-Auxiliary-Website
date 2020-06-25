<template>
  <div>
    <el-table :data="data.project"
              style="width: 100%"
              @row-dblclick="onRowdblclick">
      <el-table-column prop="pid"
                       label="作品id"
                       width="180">
      </el-table-column>
      <el-table-column prop="videoUrl"
                       label="视频url"
                       width="180">
      </el-table-column>
      <el-table-column prop="picUrl"
                       label="图片url"
                       width="180">
      </el-table-column>
    </el-table>
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
    name: 'VideoList',
    created () {
      this.getProjectList(1)
    },
    data () {
      return {
        data: {
          page_num: '',
          page_size: '',
          page_total: '',
          project: {}
        }
      }
    },
    methods: {
      getProjectList (page_num) {
        this.getRequest(`/project/projects`, {
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
        this.getFavouriteList(val)
        console.log(`当前页码:${val}`)
        console.log(`总页数为:${this.data.page_total}`)
      },
    }
  }
</script>

<style scoped>

</style>
