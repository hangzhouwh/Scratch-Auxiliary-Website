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
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="姓名" label-width="120px">
                <el-input v-model="user.name"
                          placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号" label-width="120px">
                <el-input v-model="user.phone"
                          placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="学校" label-width="120px">
                <el-select v-model="user.school" placeholder="请选择任教高校" style="width:100%">
                  <el-option
                    v-for="item in optionSchool"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px;margin-left: 20px">
                      {{ item.value }}
                    </span>
                  </el-option>
                </el-select>
              </el-form-item>
<!--              <el-form-item label="职称" label-width="120px">
                <el-select v-model="user.title" placeholder="请选择职称" style="width:100%">
                  <el-option
                    v-for="item in optionTitle"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px;margin-left: 20px">
                      {{ item.value }}
                    </span>
                  </el-option>
                </el-select>
              </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="editUserInfo()">修改信息</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu :router="true"
                 :unique-opened="true"
                 class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>作品列表</span>
            </template>
            <el-menu-item :index="'/home/project_list'">已打分</el-menu-item>
            <el-menu-item :index="'/home/project_marked_list'">未打分</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view ref="projectListRef"
                     @openMarkDialog="openMarkDialog($event,arguments)"
                     :eventCall="callRefreshProjectList"/>
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
        openProject: {
          pid: '',
          videoUrl: '',
          picUrl: ''
        },
        optionSchool: [
          {
            value: 'Zhejiang University City College',
            label: '浙大城市学院'
          }
        ],
        optionTitle:[
          {
            value: 'assistant',
            label: '助教'
          },
          {
            value: 'lecturer',
            label: '讲师'
          },
          {
            value: 'associate professor',
            label: '副教授'
          },
          {
            value: 'professor',
            label: '教授'
          }
        ]
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
        console.log(args)
        this.openProject = args
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
            this.dialogUserInfoVisible = false
            return this.$message.success('修改用户信息成功')
          } else {
            return this.$message.error('修改用户信息失败')
          }
        })
      },
      close () {
        this.dialogMarkVisible = false
        this.callRefreshProjectList()
      },
      callRefreshProjectList () {
        this.$refs.projectListRef.getProjectList(1)
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
