<template>
  <el-container>
    <el-header>
      <div class="main-header">
        <div class="header-logo"></div>
        <div>标题</div>
        <div class="userPart">
          <el-tooltip class="item" effect="light" content='修改用户资料' placement="left">
            <div @click="openUserInfoDialog">
              <LottieHelloPeep></LottieHelloPeep>
            </div>
          </el-tooltip>
          <el-dialog title="修改用户资料" :visible.sync="dialogUserInfoVisible">
            <el-form :model="user">
              <el-form-item label="用户名" label-width="120px">
                <el-input v-model="user.host"
                          autocomplete="off"
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" label-width="120px">
                <el-input v-model="user.name"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" label-width="120px">
                <el-input v-model="user.phone"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="editUserInfo()">OK</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>作品列表</span>
            </template>
            <el-menu-item index="1-1">已打分</el-menu-item>
            <el-menu-item index="1-2">未打分</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view @openMarkDialog="openMarkDialog(arguments)"/>
        <el-dialog
          title="作品打分"
          :visible.sync="dialogMarkVisible"
          width="60%">
          <markBox :projectData="openProject"
                   @close="close()"></markBox>
        </el-dialog>
      </el-main>
    </el-container>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
  import MarkBox from '../components/markBox'
  import LottieHelloPeep from '../components/LottieHelloPeep'

  export default {
    name: 'Home',
    data () {
      return {
        dialogMarkVisible: false,
        dialogUserInfoVisible: false,
        user: {
          host: '',
          password: '',
          name: '',
          phone: '',
          school: '',
          title: '',
          degree: '',
          course: '',
          yearOfTeaching: ''
        },
        videoList: [
          {}
        ],
        openProject: {
          pid: '',
          videoUrl: '',
          picUrl: ''
        }
      }
    },
    components: {
      markBox: MarkBox,
      LottieHelloPeep
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      openMarkDialog (args) {
        this.openProject = args[0]
        this.dialogMarkVisible = true
      },
      openUserInfoDialog () {
        this.user = this.$store.getters.user
        this.dialogUserInfoVisible = true
      },
      editUserInfo () {
        this.postRequest2('/user/edit_personal_info',
          this.user
        ).then(resp => {
          console.log('response=>', resp)
          if (resp) {
            this.$store.dispatch('setUser', resp.data)
            return this.$message.success('修改用户信息成功')
          } else {
            return this.$message.error('修改用户信息失败')
          }
        })
      },
      close () {
        this.dialogMarkVisible = false
      }
    }
  }
</script>

<style scoped>
  .main-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .header-logo {
    width: 50px;
    margin: 5px;
    background-image: url("../assets/logo.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }
</style>
