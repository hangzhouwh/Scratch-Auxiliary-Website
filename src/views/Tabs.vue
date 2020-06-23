<template>
  <el-main>
    <el-tabs
      style="width: 95%"
      v-model="activeName"
      @tab-click="handleClick">
      <el-tab-pane label="Rock" name="rock"></el-tab-pane>
      <el-tab-pane label="Pop" name="pop"></el-tab-pane>
      <el-tab-pane label="Hip Hop" name="hip hop"></el-tab-pane>
      <el-tab-pane label="Blues" name="blues"></el-tab-pane>
      <el-tab-pane label="Country" name="country"></el-tab-pane>
      <el-tab-pane label="Electronic" name="electronic"></el-tab-pane>
      <el-tab-pane label="Jazz" name="jazz"></el-tab-pane>
      <el-tab-pane label="Dance" name="dance"></el-tab-pane>
      <el-tab-pane label="Metal" name="metal"></el-tab-pane>
      <el-tab-pane label="Latin" name="latin"></el-tab-pane>
      <el-tab-pane label="All" name="all"></el-tab-pane>
    </el-tabs>
    <el-table
      ref="multipleTable"
      :data="data.songs"
      tooltip-effect="dark"
      :show-header='false'
      fit="fit"
      style="width: 95%"
      :row-class-name="tableRowClassName"
      @row-dblclick="onRowdblclick">
      <el-table-column
        prop="song_name"
        label="歌曲名"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="artist_name"
        label="歌手名"
        show-overflow-tooltip>
      </el-table-column>
      <!--      <el-table-column
              prop="duration"
              label="歌曲时长">
            </el-table-column>-->
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     round
                     @click="addToFavourite(scope.row.song_id)">{{ifFavourite(scope.row.is_collected)}}
          </el-button>
          <el-button size="mini"
                     type="success"
                     round
                     @click="addToSheet(scope.row.song_id)">Add To Playlist
          </el-button>
          <el-dialog title="Add To Playlist" :visible.sync="dialogAddSheetVisible">
            <el-select v-model="sheet_id"
                       clearable
                       placeholder="Place chose the playlist you want to add to">
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
      this.getTabsSongs(this.activeName, 1)
    },
    components: {},
    data () {
      return {
        activeName: 'blues',
        host: '',
        dialogAddSheetVisible: false,
        song_id: '',
        sheet_id: '',
        options: [],
        data: {
          page_total: 16,
          songs: [],
          page_num: 2,
          page_size: 2
        }
      }
    },
    methods: {
      getTabsSongs (song_type, page_num) {
        this.$axios.get('/search/song_type', {
          params: {
            host: this.$store.state.user_info.host,
            song_type: song_type,
            page_num: page_num,
            page_size: 10
          }
        }).then(response => {
          console.log(response)
          if (response.status !== 200) {
            return this.$message.error('Get Tabs Song List Error!')
          }
          this.data = response.data.data
        })
      },
      handleClick (tab, event) {
        console.log(tab.name)
        switch (tab.name) {
          case 'rock': {
            this.getTabsSongs('rock', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
          case 'pop': {
            this.getTabsSongs('pop', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
          case 'hip hop': {
            this.getTabsSongs('hip hop', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
          case 'blues': {
            this.getTabsSongs('blues', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
          case 'country': {
            this.getTabsSongs('country', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
          case 'electronic': {
            this.getTabsSongs('electronic', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
          case 'jazz': {
            this.getTabsSongs('jazz', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
          case 'dance': {
            this.getTabsSongs('dance', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
          case 'metal': {
            this.getTabsSongs('metal', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
          case 'latin': {
            this.getTabsSongs('latin', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
          case 'all': {
            this.getTabsSongs('all', this.data.page_num)
            this.handleCurrentChange(this.data.page_num)
            return
          }
        }
      },
      handleCurrentChange (val) {
        this.data.page_num = val
        this.getTabsSongs(this.activeName, val)
        console.log(`当前页码：${val}`)
      },
      addToFavourite (song_id) {
        console.log(`将要收藏的歌曲id:${song_id}`)
        this.$axios.post(`collection/${this.host}/add_song?song_id=${song_id}`).then(response => {
          console.log(`收藏歌曲网络请求的resp:`)
          console.log(response.data)
          if (response.status === 200) {
            this.getTabsSongs(this.activeName, this.data.page_num)
            return this.$message.success('Add To Favourite Success!')
          }
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
            return this.$message.error('Add To Playlist Error!')
          }
        })
      }

    }
  }
</script>

<style lang="scss" scoped>

  .el-pagination {
    margin: 20px 0;
  }

</style>
