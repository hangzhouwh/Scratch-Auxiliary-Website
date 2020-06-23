<template>
  <div>
    <!--table start-->
    <el-table
      ref="multipleTable"
      :data="data.songs"
      tooltip-effect="dark"
      :show-header='false'
      fit="fit"
      style="width: 95%"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
      @row-dblclick="onRowdblclick">
      <el-table-column
        prop="song_name"
        label="Song"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="col-cont" v-html="showDate(scope.row.song_name)"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="artist_name"
        label="Artist"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="duration"
        label="Time">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     round
                     @click="addOrDelete(scope.row.is_collected,scope.row.song_id)">
            {{ifFavourite(scope.row.is_collected)}}
          </el-button>
          <el-button size="mini"
                     type="success"
                     round
                     @click="addToSheet(scope.row.song_id)">Add To Playlist
          </el-button>
          <el-dialog title="Add To Playlist" :visible.sync="dialogAddSheetVisible">
            <el-select v-model="sheet_id"
                       clearable
                       placeholder="Place choice the playlist you want to add to"
                       @change="onChange">
              <el-option v-for="item in options"
                         :key="item.sheet_id"
                         :label="item.sheet_name"
                         :value="item.sheet_id">
              </el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogAddSheetVisible = false">Cancel</el-button>
              <el-button type="primary" @click="submitAddSheet">Ok</el-button>
            </div>
          </el-dialog>
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
      this.getSearchResultSong(1)
    },
    data () {
      return {
        host: '',
        dialogAddSheetVisible: false,
        song_id: '',
        sheet_id: '',
        options: [],
        data: {
          page_total: null,
          page_size: null,
          page_num: null,
          songs: []
        },
        multipleSelection: [],
        SearchResultForm: {
          songName: null,
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
          return this.data.songs.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
              return String(dataNews[key].toLowerCase().indexOf(search) > -1)
            })
          })
        }
        return this.data.songs
      },
    },
    watch: {
      listSearchInput (val) {
        this.getSearchResultSong()
      }
    },
    methods: {
      getSearchResultSong (page_num) {
        console.log('读取全局变量search_input:' + this.$store.state.search_input
          + '读取全局变量host:' + this.$store.state.user_info.host)
        this.SearchResultForm.songName = this.$store.state.search_input
        this.SearchResultForm.host = this.$store.state.user_info.host
        this.SearchResultForm.pageNum = page_num
        this.SearchResultForm.pageSize = 10
        console.log(this.SearchResultForm)
        this.$axios({
          method: 'post',
          url: '/search/songs',
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
        this.getSearchResultSong(val)
        console.log(`当前页码：${val}`)
      },
      addOrDelete (is_collected, song_id) {
        if (is_collected) {
          this.deleteFavouriteSong(song_id)
        } else {
          this.addFavouriteSong(song_id)
        }
      },
      addFavouriteSong (song_id) {
        console.log(`将要收藏的歌曲id:${song_id}`)
        this.$axios.post(`collection/${this.host}/add_song?song_id=${song_id}`).then(response => {
          console.log(`收藏歌曲网络请求的resp:`)
          console.log(response.data)
          this.getSearchResultSong(this.data.page_num)
        }).catch((error) => {
          console.log(error)
        })
      },
      deleteFavouriteSong (song_id) {
        console.log(`将要删除的收藏的歌曲id:${song_id}`)
        this.$axios.post(`collection/${this.host}/delete_song?song_id=${song_id}`).then(response => {
          console.log(`删除的收藏的歌曲网络请求的resp:${response.data}`)
          this.getSearchResultSong(this.data.page_num)
        }).catch((error) => {
          console.log(error)
        })
      },
      ifFavourite (is_collected) {
        if (is_collected) return 'Remove'
        return 'Favourite'
      },
      onRowdblclick (row, event, column) {
        var index = row.index
        console.log(`双击的行的index=` + index)
        console.log('更改当前的播放列表为')
        console.log(this.data.songs)
        console.log('当前的播放歌曲的index为')
        console.log(index)
        this.$emit('audioplay', this.data.songs, index)
      },
      tableRowClassName ({row, rowIndex}) {
        row.index = rowIndex
      },
      addToSheet (song_id) {
        console.log(`添加歌曲id=${song_id}到歌单`)
        this.song_id = song_id
        this.$axios.get(`/sheet/${this.host}/list`, this.host).then(response => {
          console.log(response)
          if (response.status !== 200) {
            return console.log(response.status)
          }
          console.log(response.data.data.sheets)
          this.options = response.data.data.sheets
          console.log('获取的options的内容')
          console.log(this.options)
        })
        this.dialogAddSheetVisible = true
      },
      submitAddSheet () {
        console.log('将添加新歌曲到歌单')
        this.$axios.post(`sheet/add_song?song_id=${this.song_id}&sheet_id=${this.sheet_id}`).then(response => {
          console.log('response=>', response)
          if (response.status === 200) {
            this.dialogAddSheetVisible = false
            return this.$message.success('Add To Playlist Success!')
          } else {
            return this.$message.error('Add To Playlist Success!')
          }
        })
      },
      onChange () {
        console.log(`选项改变${this.sheet_id}`)
      }
    }
  }
</script>

<style scoped>
  div {
    margin: 20px 10px;
  }
</style>
