<template>
  <div>
    <!--table start-->
    <el-table
      ref="multipleTable"
      :data="this.data.artists"
      tooltip-effect="dark"
      :show-header='false'
      fit="fit"
      style="width: 95%"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="artist_name"
        label="歌手名"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.artist_name)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     round
                     @click="addOrDelete(scope.row.is_collected,scope.row.artist_id)">
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
      console.log('跳转到Favourite时的局部变量:')
      console.log(this.host)
      this.getSearchResultArtists(1)
    },
    data () {
      return {
        host: '',
        data: {
          page_total: null,
          page_size: null,
          page_num: null,
          artists: []
        },
        multipleSelection: [],
        SearchResultForm: {
          artistName: null,
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
          return this.data.artists.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
              return String(dataNews[key].toLowerCase().indexOf(search) > -1)
            })
          })
        }
        return this.data.artists
      }
    },
    watch: {
      listSearchInput (val) {
        this.getSearchResultArtists()
      }
    },
    methods: {
      getSearchResultArtists (page_num) {
        console.log('读取全局变量search_input:' + this.$store.state.search_input
          + '读取全局变量host:' + this.$store.state.user_info.host)
        this.SearchResultForm.artistName = this.$store.state.search_input
        this.SearchResultForm.host = this.$store.state.user_info.host
        this.SearchResultForm.pageNum = page_num
        this.SearchResultForm.pageSize = 10
        this.$axios({
          method: 'post',
          url: '/search/artists',
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
        this.getSearchResultArtists(val)
        console.log(`当前页码：${val}`)
      },
      addOrDelete (is_collected, artist_id) {
        if (is_collected) {
          this.deleteFavouriteArtist(artist_id)
        } else {
          this.addFavouriteArtist(artist_id)
        }
      },
      addFavouriteArtist (artist_id) {
        console.log(`将要收藏的歌手id:${artist_id}`)
        this.$axios.post(`collection/${this.host}/add_artist?artist_id=${artist_id}`).then(response => {
          console.log(`收藏歌手网络请求的resp:`)
          console.log(response.data)
          this.getSearchResultArtists(this.data.page_num)
        }).catch((error) => {
          console.log(error)
        })
      },
      deleteFavouriteArtist (artist_id) {
        console.log(`将要取消收藏的歌手id:${artist_id}`)
        this.$axios.post(`collection/${this.host}/delete_artist?artist_id=${artist_id}`).then(response => {
          console.log(`取消收藏收藏歌手网络请求的resp:`)
          console.log(response.data)
          this.getSearchResultArtists(this.data.page_num)
        }).catch((error) => {
          console.log(error)
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
