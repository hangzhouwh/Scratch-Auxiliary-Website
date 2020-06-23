<template>
  <div>
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
      <el-table-column prop="song_name" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="artist_name" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="duration" >
      </el-table-column>
      <el-table-column >
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     round
                     @click="deleteFavouriteSong(scope.row.song_id)">Remove
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
              <el-button type="primary" @click="submitAddSheet">OK</el-button>
            </div>
          </el-dialog>
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
    name: 'Favourite-song',
    created () {
      this.host = this.$store.state.user_info.host
      console.log(`跳转到Favourite时的局部变量:${this.host}`)
      this.getFavouriteList(1)
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
        multipleSelection: []
      }
    },
    methods: {
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
      getFavouriteList (page_num) {
        this.$axios.get(`/collection/${this.host}/songs`, {
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
      deleteFavouriteSong (song_id) {
        console.log(`将要删除的收藏的歌曲id:${song_id}`)
        this.$axios.post(`collection/${this.host}/delete_song?song_id=${song_id}`).then(response => {
          console.log(`删除的收藏的歌曲网络请求的resp:${response.data}`)
          this.getFavouriteList(this.data.page_num)
        }).catch((error) => {
          console.log(error)
        })
      },
      onRowdblclick (row, event, column) {
        var index = row.index
        console.log(`双击的行的index=` + index)
        console.log('更改当前的播放列表为')
        console.log(this.data.songs)
        console.log('当前的播放歌曲的index为')
        console.log(index)
        this.$emit('audioplay',this.data.songs,index)
      },
      tableRowClassName ({row, rowIndex}) {
        row.index = rowIndex
      },
      submitAddSheet () {
        console.log('将添加新歌曲到歌单')
        this.$axios.post(`sheet/add_song?song_id=${this.song_id}&sheet_id=${this.sheet_id}`).then(response => {
          console.log('response=>', response)
          if (response.status === 200) {
            this.dialogAddSheetVisible = false
            return this.$message.success('Add To Playlist Success!')
          } else {
            return this.$message.error('Add To Playlist Error!')
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
