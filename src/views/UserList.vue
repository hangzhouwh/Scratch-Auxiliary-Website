<template>
  <div>
    <el-table :data="data.userMarkInfos"
              style="width: 100%">
      <el-table-column fixed
                       type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名">
              <span>{{ props.row.host }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="手机号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="学校">
              <span>{{ props.row.school }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="职称">
              <span>{{ props.row.title }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="学历">
              <span>{{ props.row.degree }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="教授课程">
              <span>{{ props.row.course }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="教龄">
              <span>{{ props.row.yearOfTeaching }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column fixed
                       prop="name"
                       label="用户">
      </el-table-column>
      <el-table-column v-for="(item,index) in data.column_name"
                       :key="index"
                       :label="item">
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.markDataList[index].basis||'无'" placement="top-start">
            <span>{{scope.row.markDataList[index].score}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-table id="out-table"
              :data="data.userMarkInfos"
              v-show="false">
      <el-table-column prop="name"
                       label="用户">
      </el-table-column>
      <el-table-column prop="phone"
                       label="电话">
      </el-table-column>
      <el-table-column v-for="(item,index) in data.column_name"
                       :key="index"
                       :label="item">
        <template slot-scope="scope">
          <div v-if="scope.row.markDataList[index].score!=null">
            <p>{{scope.row.markDataList[index].score}}</p>
<!--            <p>{{scope.row.markDataList[index].basis}}</p>-->
          </div>
          <span v-else>{{scope.row.markDataList[index].score}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="this.data.page_total"
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-button @click="exportExcel">导出</el-button>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    name: 'UserList',
    created () {
      this.getUserList(1)
    },
    data () {
      return {
        data: {
          page_num: null,
          page_size: null,
          page_total: null,
          column_name: [1, 2],
          userMarkInfos: []
        }
      }
    },
    methods: {
      getUserList (page_num) {
        this.getRequest(`/mark/userMark`, {
          page_num: page_num,
          page_size: 10
        }).then(resp => {
          if (resp) {
            this.data = resp.data
            console.log(this.data)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      handleCurrentChange (val) {
        this.data.page_num = val
        this.getUserList(val)
        console.log(`当前页码:${val}`)
        console.log(`总页数为:${this.data.page_total}`)
      },
      exportExcel () {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), 'sheetjs.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
