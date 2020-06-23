<template>
  <el-main>
    <el-table
      ref="multipleTable"
      :data="data.artists"
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
      <el-table-column show-overflow-tooltip>
        <template slot-scope="scope">
        {{toDate(scope.row.date)}}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     round
                     @click="addFavouriteSong(scope.row.song_id)">{{ifFavourite(scope.row.is_collected)}}
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
  </el-main>

</template>

<script>
  export default {
    created () {
      this.host = this.$store.state.user_info.host
      this.getListRecord(1)
    },
    data () {
      return {
        host: '',
        dialogAddSheetVisible: false,
        song_id: '',
        sheet_id: '',
        options: [],
        data: [
          {
            artist_id: '',
            artist_name: '',
            date: '',
            pic_url: '',
            release: '',
            song_id: '',
            song_name: '',
          }
        ],
        page_num: 1,
        multipleSelection: []
      }
    },
    methods: {
      getListRecord (page_num) {
        this.$axios.get(`user/${this.$store.state.user_info.host}/list_record`, {
          params: {
            page_num: page_num,
            page_size: 10
          }
        }).then(response => {
          console.log(response)
          if (response.status === 200) {
            this.data = response.data.data
            console.log('查看log记录数据:')
            console.log(this.data)
          }

        }).catch()
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleCurrentChange (val) {
        this.data.page_num = val
        this.getListRecord(val)
        console.log(`当前页码:${val}`)
        console.log(`总页数为:${this.data.page_total}`)
      },
      onRowdblclick (row, event, column) {
        var index = row.index
        console.log(`双击的行的index=` + index)
        console.log('更改当前的播放列表为')
        console.log(this.data.artists)
        console.log('当前的播放歌曲的index为')
        console.log(index)
        this.$emit('audioplay', this.data.artists, index)
      },
      tableRowClassName ({row, rowIndex}) {
        row.index = rowIndex
      },
      ifFavourite (is_collected) {
        if (is_collected) return 'Remove'
        return 'Favourite'
      },
      addFavouriteSong (song_id) {
        console.log(`将要收藏的歌曲id:${song_id}`)
        this.$axios.post(`collection/${this.host}/add_song?song_id=${song_id}`).then(response => {
          console.log(`收藏歌曲网络请求的resp:`)
          console.log(response.data)
          this.getListRecord(this.data.page_num)
        }).catch((error) => {
          console.log(error)
        })
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
            return this.$message.error('Add To Playlist Error!')
          }
        })
      },
      onChange () {
        console.log(`选项改变${this.sheet_id}`)
      },
      toDate (oldDate) {
        var newDate = /\d{4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}/g.exec(oldDate)
        var newDate2=/\d{4}-\d{1,2}-\d{1,2}/g.exec(newDate)
        var newDate3=/\d{1,2}:\d{1,2}/g.exec(newDate)

        var res=newDate2+'  '+newDate3
        return res
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
