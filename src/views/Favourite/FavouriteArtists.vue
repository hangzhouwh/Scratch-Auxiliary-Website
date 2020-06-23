<template>
    <div>
      <el-table
        ref="multipleTable"
        :data="data.artists"
        tooltip-effect="dark"
        :show-header='false'
        fit="fit"
        style="width: 95%"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="artist_name" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="200">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="danger"
                       round
                       @click="deleteFavouriteArtist(scope.row.artist_id)">Remove
            </el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          No Data
        </template>
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
    name: 'Favourite-artists',
    created(){
      this.host = this.$store.state.user_info.host
      console.log(`跳转到Favourite时的局部变量:${this.host}`)
      this.getFavouriteList(1)
    },
    data(){
      return{
        host: '',
        data: {
          page_total: null,
          page_size: null,
          page_num: null,
          artists: []
        },
        multipleSelection: []
      }
    },
    methods:{
      getFavouriteList(page_num){
        this.$axios.get(`/collection/${this.host}/artists`, {
          params: {
            page_num: page_num,
            page_size: 10
          }
        }).then((response) => {
          this.data = response.data.data
        }).catch((error) => {
          console.log(error)
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleCurrentChange (val) {
        this.data.page_num = val
        this.getFavouriteList(val)
        console.log(`当前页码:${val}`)
        console.log(`总页数为:${this.data.page_total}`)
      },
      deleteFavouriteArtist (artist_id) {
        console.log(`将要删除的收藏的歌手id:${artist_id}`)
        this.$axios.post(`collection/${this.host}/delete_artist?artist_id=${artist_id}`).then(response => {
          console.log(`删除的收藏的歌手网络请求的resp:${response.data}`)
          this.getFavouriteList(this.data.page_num)
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  div {
    margin: 20px 10px;
  }
</style>
