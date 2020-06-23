<template>
  <el-container>
    <!--navigation start-->
    <el-aside class="aside-nav" style="width: 250px;">
      <el-header class="header-logo">
        <div class="header-logo"></div>
      </el-header>
      <el-menu class="el-menu"
               :router="true"
               default-active='/tabs'>
        <el-menu-item-group>
          <span class="main-title" slot="title">Browse Music</span>
          <!--<el-menu-item :index="'/found'"
                        @mouseenter.native="handleMouseEnter('found')"
                        @mouseleave.native="handleMouseLeave('found')">
            <LottieMusicSpectrum ref="musicSpectrumRef" :style="{display:'inline-block'}"></LottieMusicSpectrum>
            <span class="sub-title" slot="title">Discover</span>
          </el-menu-item>-->
          <el-menu-item :index="'/tabs'">
            <i class="el-icon-star-off"></i>
            <span class="sub-title" slot="title">Tabs</span>
          </el-menu-item>
          <el-menu-item :index="'/found'">
            <i class="el-icon-star-off"></i>
            <span class="sub-title" slot="title">Discover</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <span class="main-title" slot="title">Your Music</span>
          <el-menu-item :index="'/favourite'">
            <i class="el-icon-star-off"></i>
            <span class="sub-title" slot="title">Favourite</span>
          </el-menu-item>
          <el-menu-item :index="'/log'">
            <i class="el-icon-time"></i>
            <span class="sub-title" slot="title">History</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <span class="main-title" slot="title">Your Playlists</span>
          <el-menu-item :index="'/sheet'+subItem.sheet_id"
                        v-for="subItem in my_sheets"
                        :key="subItem.sheets_id"
                        @click="sheetIDOutput(subItem.sheet_id)">
            <template slot="title">
              <i class="el-icon-wallet"></i>
              <span class="sub-title">{{subItem.sheet_name}}</span>
            </template>
          </el-menu-item>
          <el-menu-item @click="createSheet">
            <i class="el-icon-plus"></i>
            <span class="sub-title" slot="title">New Playlist</span>
          </el-menu-item>
          <el-dialog title="Create Sheet" :visible.sync="dialogNewSheetVisible">
            <el-form :model="new_sheet">
              <el-form-item label="Sheet Name" :label-width="formLabelWidth">
                <el-input v-model="new_sheet.sheet_name" autocomplete="off"
                          placeholder="Please enter a playlist name"></el-input>
              </el-form-item>
              <el-form-item label="Describe" :label-width="formLabelWidth">
                <el-input v-model="new_sheet.description" type="textarea" autocomplete="off"
                          placeholder="This man is lazy. He didn't write anything"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogNewSheetVisible = false">Cancel</el-button>
              <el-button type="primary" @click="submitNewSheet">OK</el-button>
            </div>
          </el-dialog>
        </el-menu-item-group>
        <el-menu-item-group style="height: 500px">

        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <!--navigation end-->


    <!--main start-->

    <el-container>
      <el-header>
        <div class="main-header">
          <el-input class="search"
                    placeholder="Search fro songs, artists, sheets etc..."
                    v-model="search_input"
                    clearable
                    prefix-icon="el-icon-search"
                    style="width: 500px"
                    @keyup.enter.native="search(search_input)"
                    @change="search(search_input)">
          </el-input>
          <div class="userPart">
            <div @click="settingClick">
              <i class="el-icon-s-tools"></i>
            </div>
            <el-tooltip class="item" effect="light" content='Personal Info' placement="left">
              <div @click="avatarClick">
                <LottieHelloPeep></LottieHelloPeep>
              </div>
            </el-tooltip>
          </div>
          <el-dialog title="Personal Info" :visible.sync="dialogFormVisible">
            <el-form :model="user_info">
              <el-form-item label="Username" :label-width="formLabelWidth">
                <el-input v-model="user_info.name" autocomplete="off"
                          placeholder="Place enter your username"></el-input>
              </el-form-item>
              <el-form-item label="Phone" :label-width="formLabelWidth">
                <el-input v-model="user_info.phone" autocomplete="off" placeholder="Place enter your phone"></el-input>
              </el-form-item>
              <el-form-item label="Email" :label-width="formLabelWidth">
                <el-input v-model="user_info.email" autocomplete="off" placeholder="Place enter your email"></el-input>
              </el-form-item>
              <el-form-item label="Age" :label-width="formLabelWidth">
                <el-input v-model="user_info.age" autocomplete="off" placeholder="Place enter your age"></el-input>
              </el-form-item>
              <el-form-item label="Sex" :label-width="formLabelWidth">
                <el-select v-model="user_info.sex" placeholder="Place enter your sex">
                  <el-option label="Male" value="Male"></el-option>
                  <el-option label="Female" value="Female"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="editUserInfo()">OK</el-button>
            </div>
          </el-dialog>
          <el-dialog title="Modify Password" :visible.sync="dialogForm02Visible">
            <el-form
              :rules="rules"
              ref="ModifyFormRef"
              v-loading="loading"
              element-loading-text="Loading..."
              element-loading-spinner="el-icon-loading"
              :model="ModifyForm"
              class="loginContainer">
              <el-form-item prop="host">
                <el-input size="normal"
                          type="text"
                          v-model="ModifyForm.host"
                          auto-complete="off"
                          placeholder="Place enter your phone or e-mail"
                          prefix-icon="el-icon-user-solid"
                          :disabled="true"></el-input>
              </el-form-item>
              <el-form-item prop="vc">
                <el-input size="normal"
                          type="text"
                          v-model="ModifyForm.vc"
                          auto-complete="off"
                          placeholder="Place enter verification code"
                          prefix-icon="el-icon-user-solid">
                  <el-button slot="append"
                             @click="sendCode">Send code
                  </el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="password1">
                <el-input size="normal"
                          type="password"
                          v-model="ModifyForm.password1"
                          auto-complete="off"
                          placeholder="Place enter new password"
                          prefix-icon="el-icon-s-goods"
                          :disabled="newPasswordFlag"></el-input>
              </el-form-item>
              <el-form-item prop="password2">
                <el-input size="normal"
                          type="password"
                          v-model="ModifyForm.password2"
                          auto-complete="off"
                          placeholder="Place enter new password again"
                          prefix-icon="el-icon-s-goods"
                          :disabled="newPasswordFlag"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="normal"
                           type="primary"
                           style="width: 100%"
                           @click="verify">Verify
                </el-button>
                <el-button size="normal"
                           type="primary"
                           style="width: 100%"
                           @click="submitModify">Submit New Password
                </el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

        </div>
      </el-header>
      <div style="height: 20px"></div>
      <router-view @reload="initSheetMenu"
                   @audioplay="audioplay(arguments)"
                   @reloadSheet="reload"
                   v-if="RouterState"></router-view>
      <div style="height: 110px"></div>
    </el-container>
    <!--main end-->
    <PlayerBar ref="playerBarRef"
               @audioplay="audioplayFromPlayBar()"
               @preview="previewSong()"
               @next="nextSong()"
               @showLyric="showLyric($event,song_id)"></PlayerBar>

    <el-dialog
      class="lyric"
      :visible.sync="dialogLyricVisible"
      fullscreen="fullscreen">
      <p v-for="item in this.lyric">{{item}}</p>
    </el-dialog>
  </el-container>
</template>

<script>
  import PlayerBar from '../components/PlayerBar.vue'
  import LottieHelloPeep from '../components/LottieHelloPeep'
  import LottieMusicSpectrum from '../components/buttonIcon/LottieMusicSpectrum'

  export default {
    name: 'home',
    components: {
      PlayerBar,
      LottieHelloPeep,
      LottieMusicSpectrum
    },
    provide () {
      return {
        reload: this.reload
      }
    },
    created () {
      console.log('!!!Home页面created!!!')
      this.user_info = this.$store.state.user_info
      console.log('跳转到home时的局部变量：')
      console.log(this.user_info)
      this.initSheetMenu()
    },
    mounted () {
      this.initSheetMenu()
    },
    data () {
      var validatePhoneEmail = (rule, value, callback) => {
        if (/^((13[0-9])|(15[0-9])|(147)|(17[0-9])|(18[0-9]))\d{8}$/.test(value)) {
          this.type = 'phone'
          callback()
        } else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          this.type = 'email'
        } else {
          callback(new Error('Place enter the right phone number or e-mail'))
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Place enter your new password'))
        } else {
          callback()
        }
      }
      var validatePassConfirm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Place enter your new password again'))
        } else if (value !== this.ModifyForm.password1) {
          callback(new Error('Input password is inconsistent'))
        } else {
          callback()
        }
      }
      return {
        logoSrc: '../assets/background2.jpg',
        dialogLyricVisible: false,
        dialogNewSheetVisible: false,
        new_sheet: {
          sheet_name: null,
          description: 'This man is lazy. He didn\'t write anything'
        },
        my_sheets: [
          {
            sheets_id: '',
            sheets_name: ''
          }
        ],
        /*搜索输入*/
        search_input: '',
        RouterState: true,

        /*用户头像*/
        avatar_src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',

        dialogFormVisible: false,
        user_info: {
          host: null,
          name: null,
          sex: null,
          email: null,
          phone: null,
          age: null
        },
        formLabelWidth: '120px',
        dialogForm02Visible: false,
        loading: false,
        ModifyForm: {
          host: null,
          vc: null,
          password1: null,
          password2: null
        },
        realVc: null,
        type: null,
        rules: {
          // host: [{required: true, validator: validatePhoneEmail, trigger: 'blur'}],
          vc: [{required: true, trigger: 'blur'}],
          password1: [{required: true, validator: validatePass, trigger: 'blur'}],
          password2: [{required: true, validator: validatePassConfirm, trigger: 'blur'}],
        },
        newPasswordFlag: true,

        songs: [],
        index: '',
        currentSong: {},

        lyric: ''
      }
    },
    methods: {
      initSheetMenu () {
        this.$axios.get(`/sheet/${this.user_info.host}/list`, this.user_info.host).then(response => {
          console.log(response)
          if (response.status !== 200) {
            return console.log(response.status)
          }
          console.log(response.data.data.sheets)
          this.my_sheets = response.data.data.sheets
          console.log('获取的my_sheets的内容')
          console.log(this.my_sheets)
          for (var subItem in this.my_sheets) {
            console.log(this.my_sheets[subItem].sheet_id)
            console.log(this.my_sheets[subItem].sheet_name)
          }
        })
      },
      createSheet () {
        console.log('创建歌单函数')
        this.dialogNewSheetVisible = true
      },
      reload () {
        console.log('重新加载一下')
        this.RouterState = false
        this.$nextTick(() => {
          this.RouterState = true
        })
      },
      sheetIDOutput (sheets_id) {
        console.log(sheets_id)
        this.$router.push({name: 'sheet', params: {sheet_id: sheets_id}})
        this.reload()
      },
      submitNewSheet () {
        console.log('post新歌单信息')
        console.log(this.new_sheet)
        console.log(this.user_info)
        this.$axios.post(`sheet/${this.user_info.host}/create`, this.user_info.host, {
          params: {
            sheet_name: this.new_sheet.sheet_name,
            description: this.new_sheet.description,
            host: this.user_info.host
          }
        }).then(response => {
          console.log('response=>', response)
          if (response.status === 200) {
            this.dialogNewSheetVisible = false
            this.initSheetMenu()
            return
          } else {
            return
          }
        })
      },
      search (search_input) {
        this.$store.commit('postSearchInput', search_input)
        console.log('全局赋值搜索关键字' + this.$store.state.search_input)
        this.$router.push('/searchResult')
        this.reload()
      },
      avatarClick () {
        this.user_info = this.$store.state.user_info
        this.dialogFormVisible = true
      },
      settingClick () {
        this.user_info = this.$store.state.user_info
        this.ModifyForm.host = this.user_info.host
        console.log(this.ModifyForm.host)
        if (/^((13[0-9])|(15[0-9])|(147)|(17[0-9])|(18[0-9]))\d{8}$/.test(this.ModifyForm.host)) {
          this.type = 'phone'
          callback()
        } else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.ModifyForm.host)) {
          this.type = 'email'
        } else {
          console.log('User host is not right')
        }
        this.dialogForm02Visible = true
      },
      editUserInfo () {
        this.user_info = this.$store.state.user_info
        console.log('post的用户信息：')
        console.log(this.user_info)
        this.$axios({
          method: 'post',
          url: 'user/edit_personal_info',
          data: this.user_info,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          console.log('response=>', response)
          if (response.status === 200) {
            this.dialogFormVisible = false
            return this.$message.success('Edit Info Success!')
          } else {
            return this.$message.error('Error!')
          }
        })
      },
      audioplay (args) {
        this.songs = args[0]
        this.index = args[1]
        console.log('由Favourite传递到Home的两个参数分别为:')
        console.log(this.songs)
        console.log(this.index)
        this.currentSong = this.getSongInfoFromSongs()
        console.log('接下来将要播放的歌曲:')
        console.log(this.currentSong)
        this.$refs.playerBarRef.onPlay(this.currentSong)
      },
      audioplayFromPlayBar () {
        console.log('播放暂停的音乐')
        this.$refs.playerBarRef.rePlay()
      },
      previewSong () {
        this.index -= 1
        if (this.index < 0) {
          this.index = this.songs.length - 1
        }
        this.currentSong = this.getSongInfoFromSongs()
        console.log('接下来将要播放的歌曲:')
        console.log(this.currentSong)
        this.$refs.playerBarRef.onPlay(this.currentSong)
      },
      nextSong () {
        this.index += 1
        if (this.index === this.songs.length) {
          this.index = 0
        }
        this.currentSong = this.getSongInfoFromSongs()
        console.log('接下来将要播放的歌曲:')
        console.log(this.currentSong)
        this.$refs.playerBarRef.onPlay(this.currentSong)
      },
      getSongInfoFromSongs () {
        return this.songs[this.index]
      },
      handleMouseEnter (val) {
        switch (val) {
          case 'found':
            this.$refs.musicSpectrumRef.play()
            break
        }
      },
      handleMouseLeave (val) {
        switch (val) {
          case 'found':
            this.$refs.musicSpectrumRef.pause()
            break
        }
      },
      showLyric (song_id) {
        console.log(song_id)
        this.dialogLyricVisible = true
        this.getLyric(song_id)
      },
      getLyric (song_id) {
        console.log(`获取歌曲id=${song_id}的歌词`)
        this.$http.get(`http://39.101.189.21:3000/lyric`, {
          params: {
            id: song_id
          }
        }).then(response => {
          console.log(response)
          if (response.status === 200) {
            this.lyric = response.data.lrc.lyric
            this.lyric = this.parseLyric(this.lyric)
            // this.lyric = this.parseLyric(this.lyric)
            console.log(this.lyric)
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
      },
      sendCode () {
        if (this.ModifyForm.host !== null) {
          console.log('host not null')
          if (this.type === 'phone') {
            this.$axios.post('/user/send_msg', {}, {
              params: {
                phone: this.ModifyForm.host
              }
            }).then(response => {
              console.log(response)
              if (response.status !== 200) {
                this.$message.error('Verification code have some error!')
              }
              this.realVc = response.data.data.vc
              this.$message.success('Verification code have already sent!')
            })
          } else if (this.type === 'email') {
            console.log('host is email')
            this.$axios.post('/user/send_email', {}, {
              params: {
                address: this.ModifyForm.host
              }
            }).then(response => {
              console.log(response)
              if (response.status !== 200) {
                this.$message.error('Verification code have some error!')
              }
              this.realVc = response.data.data.vc
              this.$message.success('Verification code have already sent!')
            })
          } else {
            this.$message.error('phone or email error!')
          }
        } else {
          this.$message.error('Place enter phone or email')
        }
      },
      verify () {
        console.log('提交验证码')
        if (this.ModifyForm.vc === this.realVc) {
          this.$message.success('Verification code is right!')
          this.newPasswordFlag = false
        } else {
          this.$message.error('Verification code is error!')
        }
        /*this.$refs.VerificationFormRef.validate((valid) => {
          console.log(this.RegisterForm)
          if (valid) {
            console.log('提交的注册信息的合法的')
            this.loading = true

          } else {
            return this.$message.warning('Info Error!')
          }
        })*/
      },
      submitModify () {
        this.$refs.ModifyFormRef.validate((valid)=>{
          if (valid){
            console.log('提交新密码')
            console.log(this.password)
            this.$axios.post(`user/${this.ModifyForm.host}/edit_pwd`, {}, {
              params: {
                pwd1: this.ModifyForm.password1,
                pwd2: this.ModifyForm.password2
              }
            }).then(response => {
              if (response.status !== 200) {
                this.$message.error('Modify password error!')
              } else {
                this.$message.success('Modify password success!')
                this.dialogForm02Visible = false
                this.ModifyForm.vc = null
                this.ModifyForm.password1 = null
                this.ModifyForm.password2 = null
                this.newPasswordFlag = true
              }
            })
          }else {
            return this.$message.warning('Modify Password Error!')
          }

        })

      }
    }
  }
</script>

<style lang="scss" scoped>

  .aside-nav {
    padding: 0 20px;
    margin-right: 20px;
    background-color: $background-menu-color;
  }

  .el-header.header-logo {
    margin: 30px 15px 0 15px;
    background-image: url("../assets/envato_white_2.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .main-header {
    margin: 20px 20px 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .userPart {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      i {
        margin: 10px;
      }

    }
  }

  .el-menu-item-group .el-button {
    display: inline;
  }

  .el-menu-item {
    span {
      margin-left: 10px;
    }
  }
</style>
