<template>
  <div>
    <!--table start-->
    <el-table
      ref="multipleTable"
      :data="this.data.sheets"
      tooltip-effect="dark"
      :show-header='false'
      fit="fit"
      style="width: 95%"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="artist_name"
        label="歌单名">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.sheet_name)"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="artist_name"
        label="创建人">
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.creator_name)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     round
                     @click="addOrDelete(scope.row.is_collected,scope.row.sheet_id)">
            {{ifFavourite(scope.row.is_collected)}}
          </el-button>
        </template>
      </el-table-column>
      <template slot="empty">
        No Data
      </template>
    </el-table>
    <!--table end-->

    <!--pagination start-->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count=this.data.page_total
      @current-change="handleCurrentChange">
    </el-pagination>
    <!--pagination end-->
  </div>
</template>

<script>
  export default {
    created () {
      this.host = this.$store.state.user_info.host
      console.log('跳转到SearchResultSheet时的局部变量:')
      console.log(this.host)
      this.getSearchResultSheet(1)
    },
    data () {
      return {
        host: '',
        data: {
          page_total: null,
          page_size: null,
          page_num: null,
          sheets: []
        },
        multipleSelection: [],
        SearchResultForm: {
          sheetName: null,
          host: null,
          pageNum: null,
          pageSize: null
        }
      }
    },
    computed: {
      listSearchInput () {
        return this.$store.state.search_input
      },
      tables: function () {
        const search = this.$store.state.search_input
        if (search) {
          return this.data.sheets.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
              return String(dataNews[key].toLowerCase().indexOf(search) > -1)
            })
          })
        }
        return this.data.sheets
      }
    },
    watch: {
      listSearchInput (val) {
        this.getSearchResultSheet()
      }
    },
    methods: {
      getSearchResultSheet (page_num) {
        console.log('读取全局变量search_input:' + this.$store.state.search_input
          + '读取全局变量host:' + this.$store.state.user_info.host)
        this.SearchResultForm.sheetName = this.$store.state.search_input
        this.SearchResultForm.host = this.$store.state.user_info.host
        this.SearchResultForm.pageNum = page_num
        this.SearchResultForm.pageSize = 10

        this.$axios({
          method: 'post',
          url: '/search/sheets',
          data: this.SearchResultForm
        }).then((response) => {
          this.data = response.data.data
          console.log(`请求搜索结果的resp-data:`)
          console.log(this.data)
        }).catch((error) => {
          console.log(error)
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      showDate (val) {
        val = val + ''
        if (val.indexOf(this.$store.state.search_input) !== -1 && this.$store.state.search_input !== '') {
          return val.replace(this.$store.state.search_input, '<font color="#2ed297">' + this.$store.state.search_input + '</font>')
        } else {
          return val
        }
      },
      handleCurrentChange (val) {
        this.data.page_num = val
        this.getSearchResultSheet(val)
        console.log(`当前页码：${val}`)
      },
      addOrDelete (is_collected, sheet_id) {
        if (is_collected) {
          this.deleteSheet(sheet_id)
        } else {
          this.addFavouriteSheet(sheet_id)
        }
      },
      addFavouriteSheet (sheet_id) {
        console.log(`将要收藏的歌单id:${sheet_id}`)
        this.$axios.post(`sheet/${this.host}/collect?sheet_id=${sheet_id}`).then(response => {
          console.log(`收藏歌单网络请求的resp:`)
          console.log(response.data)
          this.getSearchResultSheet(this.data.page_num)
        }).catch((error) => {
          console.log(error)
        })
      },
      deleteSheet (sheet_id) {
        console.log(`将要删除的歌单id=${sheet_id}`)
        this.$axios.get(`sheet/${this.host}/delete`, {
          params: {
            sheet_id: sheet_id
          }
        }).then((response) => {
          if (response.status === 200) {
            this.getSearchResultSheet(1)
            this.$emit('reload')
            return this.$message.success('Delete Success!')
          } else {
            return this.$message.error('Delete Error!')
          }
        })
      },
      ifFavourite (is_collected) {
        if (is_collected) return 'Remove'
        return 'Favourite'
      }
    }
  }
</script>

<style scoped>
  div {
    margin: 20px 10px;
  }
</style>
