<template>
  <el-main>
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in this.carousel_image">
        <el-image :src="item.url"></el-image>
      </el-carousel-item>
    </el-carousel>
    <!--rec start-->
    <div class="discover-table">
      <div class="discover-table-1">
        <h3>Recomand 1</h3>
        <el-table
          :data="data.songs"
          :show-header='false'
          :row-class-name="tableRowClassName"
          @row-dblclick="onRowdblclick">
          <el-table-column
            label="专辑封面"
            class="table-cover"
            width="80">
            <template slot-scope="scope">
              <div class="avatar-wrapper">
                <el-avatar shape="square" :size="50" :src="scope.row.pic_url"></el-avatar>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="歌曲名&歌手名"
            width="300">
            <template slot-scope="scope">
              <div class="name-wrapper">
                <h3>{{ scope.row.song_name }}</h3>
                <h4>{{ scope.row.artist_name }}</h4>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           width="30">
            <template slot-scope="scope">
              <el-popover :ref="'popover-'+scope.row.song_id"
                          placement="right"
                          trigger="hover">
                <div>
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
                </div>
                <i class="el-icon-more more-button" slot="reference"></i>
              </el-popover>
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
          :page-count=this.data.page_total
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <div class="discover-table-2">
        <h3>Recomand 2</h3>
        <el-table
          :data="data2.songs"
          :show-header='false'
          :row-class-name="tableRowClassName"
          @row-dblclick="onRowdblclick2">
          <el-table-column class="table-cover" width="80">
            <template slot-scope="scope">
              <div class="avatar-wrapper">
                <el-popover placement="left"
                            trigger="hover">
                  <p v-for="item in parseLyric(scope.row.reason)">{{item}}</p>
                  <el-avatar slot="reference" shape="square" :size="50" :src="scope.row.pic_url"></el-avatar>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="300">
            <template slot-scope="scope">
              <div class="name-wrapper">
                <h3>{{ scope.row.song_name }}</h3>
                <h4>{{ scope.row.artist_name }}</h4>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="30">
            <template slot-scope="scope">
              <el-popover :ref="'popover-'+scope.row.song_id"
                          placement="right"
                          trigger="hover">
                <div style="text-align: right; margin: 0">
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
                </div>
                <i class="el-icon-more more-button" slot="reference"></i>
              </el-popover>
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
          :page-count=this.data2.page_total
          @current-change="handleCurrentChange2">
        </el-pagination>
      </div>
    </div>
    <!--rec end-->
  </el-main>
</template>

<script>
  export default {
    created () {
      this.host = this.$store.state.user_info.host
      this.$emit('reload')
      console.log(this.$store.state.recommendList)
      this.getRecommandation(1)
      this.getRecommandation2(1)
      // if (this.$store.state.recommendList.value1 === false) {
      //
      //   this.$store.commit('postValue1', true)
      // }
      // this.data = this.$store.state.recommendList.data1
      // if (this.$store.state.recommendList.value2 === false) {
      //
      //   this.$store.commit('postValue2', true)
      // }
      // this.data2 = this.$store.state.recommendList.data2
    },
    data () {
      return {
        carousel_image: [
          {url: require('../assets/carousel_image_url_1.jpg')},
          {url: require('../assets/carousel_image_url_2.jpg')},
          {url: require('../assets/carousel_image_url_3.jpg')},
          {url: require('../assets/carousel_image_url_4.png')}
        ],
        /*推荐歌曲*/
        data: {
          page_num: 1,
          page_size: 5,
          page_total: 6,
          songs: []
        },
        data2: {
          page_num: 1,
          page_size: 5,
          page_total: 6,
          songs: []
        },
        host: '',
        dialogAddSheetVisible: false,
        song_id: '',
        sheet_id: '',
        options: []
      }
    },
    methods: {
      getRecommandation (page_num) {
        this.$axios.get(`rec/${this.host}/recommandbyDl`, {
          params: {
            page_num: page_num,
            page_size: 4
          }
        }).then((response) => {
          console.log('get推荐歌曲结果')
          console.log(response)
          if (response.status === 200) {
            this.data = response.data.data
            return this.$message.success('Get Recommend Song List Success!')
          } else {
            return this.$message.error('Get Recommend Song List Error!')
          }
        })
      },
      getRecommandation2 (page_num) {
        this.$axios.get(`rec/${this.host}/recommandbyItemcf`, {
          params: {
            page_num: page_num,
            page_size: 4
          }
        }).then((response) => {
          console.log('get推荐2歌曲结果')
          console.log(response)
          if (response.status === 200) {
            this.data2 = response.data.data
            return this.$message.success('Get Recommend Song List 02 Success!')
          } else {
            return this.$message.error('Get Recommend Song List 02 Error!')
          }
        })
      },
      // getRecommandation (page_num) {
      //   this.$axios.get(`rec/${this.host}/recommandbyDl`, {
      //     params: {
      //       page_num: page_num,
      //       page_size: 4
      //     }
      //   }).then((response) => {
      //     console.log('get推荐歌曲结果')
      //     console.log(response)
      //     if (response.status === 200) {
      //       this.$store.commit('postData1', response.data.data)
      //       return this.$message.success('Get Recommend Song List Success!')
      //     } else {
      //       return this.$message.error('Get Recommend Song List Error!')
      //     }
      //   })
      // },
      // getRecommandation2 (page_num) {
      //   this.$axios.get(`rec/${this.host}/recommandbyItemcf`, {
      //     params: {
      //       page_num: page_num,
      //       page_size: 4
      //     }
      //   }).then((response) => {
      //     console.log('get推荐2歌曲结果')
      //     console.log(response)
      //     if (response.status === 200) {
      //       this.$store.commit('postData2', response.data.data)
      //       return this.$message.success('Get Recommend Song List 02 Success!')
      //     } else {
      //       return this.$message.error('Get Recommend Song List 02 Error!')
      //     }
      //   })
      // },
      handleCurrentChange (val) {
        this.data.page_num = val
        this.getRecommandation(val)
        console.log(`当前页码：${val}`)
      },
      handleCurrentChange2 (val) {
        this.data2.page_num = val
        this.getRecommandation2(val)
        console.log(`当前页码：${val}`)
      },
      addToFavourite (song_id) {
        console.log(`将要收藏的歌曲id:${song_id}`)
        this.$refs['popover-' + song_id].doClose()
        this.$axios.post(`collection/${this.host}/add_song?song_id=${song_id}`).then(response => {
          console.log(`收藏歌曲网络请求的resp:`)
          console.log(response.data)
          if (response.status === 200) {
            this.getRecommandation(this.data.page_num)
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
      onRowdblclick2 (row, event, column) {
        var index = row.index
        console.log(`双击的行的index=` + index)
        console.log('更改当前的播放列表为')
        console.log(this.data2.songs)
        console.log('当前的播放歌曲的index为')
        console.log(index)
        this.$emit('audioplay', this.data2.songs, index)
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
        this.$refs['popover-' + song_id].doClose()
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
      parseLyric (text) {
        var lines = text.split('\n')
        var pattern = /\[(ti\s*:\s*)?([^\]]+)\]/g
        var result = []

        lines.forEach(function (v, i, a) {
          var time = v.match(pattern)
          var value = v.replace(pattern, '')
          result.push(value)
        })

        console.log(result)
        return result
      }
    }
  }
</script>

<style lang="scss" scoped>

  .discover-table {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .el-table {

      .avatar-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
      }

      .name-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        h3, h4 {
          margin: 0;
        }
      }

      .more-button {
        padding: 0;
      }
    }
  }

  .el-carousel {
    margin: 10px 0 0 0;
  }

  .el-pagination {
    margin: 20px 0;
  }

</style>
