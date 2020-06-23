<template>
  <el-main>
    <div class="sheet_show">
      <el-avatar shape="square" :size='300'
                 :src="'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'"></el-avatar>
      <div>
        <p>{{this.data.sheet_name}}</p>
        <p>{{this.data.description}}</p>
      </div>
      <div>
        <el-button :type=this.ifOpenType
                   :icon=this.ifOpenIcon
                   circle
                   @click="publicOrPrivate()"
        ></el-button>
      </div>
      <div>
        <el-button type="danger"
                   icon="el-icon-delete"
                   circle
                   @click="deleteSheet"></el-button>
      </div>
    </div>

    <el-table
      ref="multipleTable"
      :data="this.data.songs"
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
      <el-table-column prop="duration" width="150">
      </el-table-column>
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     round
                     @click="addToFavourite(scope.row.song_id)">Favourite
          </el-button>
          <el-button size="mini"
                     type="success"
                     round
                     @click="deleteSong(scope.row.song_id)">Remove
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
  </el-main>

</template>

<script>
  export default {
    created () {
      console.log('对应路由信息对象参数')
      console.log(this.$router.currentRoute.params)
      this.data.sheet_id = this.$router.currentRoute.params.sheet_id
      console.log('获得的当前歌单id')
      console.log(this.data.sheet_id)
      this.host = this.$store.state.user_info.host
      this.getInfo(1)
    },
    data () {
      return {
        data: {},
        multipleSelection: [],
        host: 'wuh1234'
      }
    },
    computed: {
      ifOpenType () {
        return this.data.is_open ? 'info' : 'success'
      },
      ifOpenIcon () {
        return this.data.is_open ? 'el-icon-remove' : 'el-icon-success'
      }
    },
    methods: {
      getInfo (page_num) {
        this.$axios.get('sheet/get_info', {
          params: {
            sheet_id: this.data.sheet_id,
            page_num: page_num,
            page_size: '5'
          }
        }).then((response) => {
          if (response.status === 200) {
            console.log(response)
            this.data = response.data.data
            console.log('查看赋值的data')
            console.log(this.data)
          }
        })
      },
      handleCurrentChange (val) {
        this.data.page_num = val
        this.getInfo(val)
        console.log(`当前页码:${val}`)
        console.log(`总页数为:${this.data.page_total}`)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      publicOrPrivate () {
        console.log('判断是否为公开歌单' + this.data.is_open)
        if (this.data.is_open) {
          this.privateSheet()
        } else {
          this.publicSheet()
        }
      },
      publicSheet () {
        console.log(`将要公开的歌单id=${this.data.sheet_id}`)
        this.$axios.post(`sheet/open?sheet_id=${this.data.sheet_id}`).then((response) => {
          if (response.status === 200) {
            this.$emit('reloadSheet')
            console.log(response)
          }
        })
      },
      privateSheet () {
        console.log(`将要公开的歌单id=${this.data.sheet_id}`)
        this.$axios.post(`sheet/close?sheet_id=${this.data.sheet_id}`).then((response) => {
          if (response.status === 200) {
            this.$emit('reloadSheet')
            console.log(response)
          }
        })
      },
      deleteSheet () {
        console.log(`将要删除的歌单id=${this.data.sheet_id}`)
        this.$axios.get(`sheet/${this.host}/delete`, {
          params: {
            sheet_id: this.data.sheet_id
          }
        }).then((response) => {
          if (response.status === 200) {
            this.$emit('reload')
            this.$router.push('/home')
            return this.$message.success('Delete Success!')
          } else {
            return this.$message.error('Delete Error!')
          }
        })
      },
      addToFavourite (song_id) {
        console.log(`将要收藏的歌曲id:${song_id}`)
        this.$axios.post(`collection/${this.host}/add_song?song_id=${song_id}`).then(response => {
          console.log(`收藏歌曲网络请求的resp:`)
          console.log(response.data)
          if (response.status === 200) {
            return this.$message.success('Add To Favourite Success!')
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      deleteSong (song_id) {
        console.log('funcation deleteSong ' + song_id)
        this.$axios.get('sheet/delete_song', {
          params: {
            sheet_id: this.data.sheet_id,
            song_id: song_id,
          }
        }).then((response) => {
          if (response.status === 200) {
            this.getInfo(this.data.page_num)
            return this.$message.success('Delete Success!')

          } else {
            return this.$message.error('Delete Error!')
          }
        })
      },
      tableRowClassName ({row, rowIndex}) {
        row.index = rowIndex
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
    }
  }
</script>

<style lang="scss" scoped>
  .el-avatar {
    margin: 20px;
  }

  .el-pagination {
    margin: 20px;
  }

  .sheet_show {
    display: flex;
    flex-direction: row;
    margin: 20px 0;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 30px;
    }
  }
</style>
