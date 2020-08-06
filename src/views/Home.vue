<template>
  <el-container>
    <el-header>
      <div class="main-header">
        <div class="header-logo"></div>
        <h3>可视化编程计算思维评测</h3>
        <div class="userPart">
          <el-tooltip class="item" effect="light" content='修改用户资料' placement="left">
            <div @click="openUserInfoDialog">
              <LottieHelloPeep></LottieHelloPeep>
            </div>
          </el-tooltip>
          <el-dialog title="修改用户资料" :visible.sync="dialogUserInfoVisible">
            <el-form :rules="rules"
                     ref="UserInfoFormRef"
                     v-loading="loading"
                     element-loading-text="Loading..."
                     element-loading-spinner="el-icon-loading"
                     :model="userInfoForm">
              <el-form-item label="用户名" prop="host">
                <el-input v-model="userInfoForm.host"
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="userInfoForm.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="userInfoForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userInfoForm.email"></el-input>
              </el-form-item>
              <el-form-item label="学校" prop="school">
                <el-input v-model="userInfoForm.school"></el-input>
              </el-form-item>
              <el-form-item label="职称" prop="title">
                <el-select v-model="userInfoForm.title" style="width:100%">
                  <el-option
                    v-for="item in optionTitle"
                    :key="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学历" prop="degree">
                <el-select v-model="userInfoForm.degree" style="width:100%">
                  <el-option
                    v-for="item in optionDegree"
                    :key="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教授课程" prop="course">
                <el-input v-model="userInfoForm.course"></el-input>
              </el-form-item>
              <el-form-item label="教龄" prop="yearOfTeaching">
                <el-select v-model="userInfoForm.yearOfTeaching" style="width:100%">
                  <el-option
                    v-for="item in optionYearOfTeaching"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogUserInfoVisible = false">取消</el-button>
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
            <el-menu-item :index="'/home/project_list'">未打分</el-menu-item>
            <el-menu-item :index="'/home/project_marked_list'">已打分</el-menu-item>
          </el-submenu>
          <el-menu-item index="2"
                        onclick="">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>修改密码</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3"
                        onclick="openWord()">
            <template slot="title">
              <i class="el-icon-info"></i>
              <span>系统公告</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view ref="projectListRef"
                     @openMarkDialog="openMarkDialog($event,arguments)"
                     :eventCall="callRefreshProjectList"/>
        <el-dialog
          title="作品打分"
          :visible.sync="dialogMarkVisible"
          @close='closeDialog'
          width="60%">
          <markBox ref="markBoxRef"
                   :projectData="openProject"
                   @close="close()"
                   :eventCall="closeMarkBox"></markBox>
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
        loading: false,
        userInfoForm: {
          host: null,
          password: null,
          name: null,
          phone: null,
          school: null,
          title: null,
          degree: null,
          course: null,
          yearOfTeaching: null
        },
        rules: {},
        openProject: {
          pid: '',
          videoUrl: '',
          picUrl: '',
          basis: '',
          score: ''
        },
        optionTitle: [
          {
            value: '正高级教师'
          },
          {
            value: '高级教师'
          },
          {
            value: '一级教师'
          },
          {
            value: '二级教师'
          },
          {
            value: '三级教师'
          }
        ],
        optionDegree: [
          {
            value: '大学本科以上'
          },
          {
            value: '硕士研究生以上'
          },
          {
            value: '博士研究生以上'
          },
        ],
        optionYearOfTeaching: [
          {
            value: '1',
            label: '一年以上'
          },
          {
            value: '2',
            label: '两年以上'
          },
          {
            value: '3',
            label: '三年以上'
          },
          {
            value: '5',
            label: '五年以上'
          },
          {
            value: '10',
            label: '十年以上'
          },
          {
            value: '15',
            label: '十五年以上'
          },
          {
            value: '20',
            label: '二十年以上'
          },
          {
            value: '30',
            label: '三十年以上'
          },
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
        this.openProject = args
        this.dialogMarkVisible = true
      },
      openUserInfoDialog () {
        this.userInfoForm = this.$store.getters.user
        console.log(this.userInfoForm)
        this.dialogUserInfoVisible = true
      },
      editUserInfo () {
        this.$refs.UserInfoFormRef.validate((valid) => {
          console.log(this.userInfoForm)
          if (valid) {
            console.log('提交的用户信息是合法的')
            this.loading = true
            this.postRequest2('/user/edit_personal_info',
              this.userInfoForm
            ).then(response => {
              console.log('response=>', response)
              if (response) {
                this.dialogUserInfoVisible = false
                this.loading = false
                return this.$message.success('修改信息成功！')
              } else {
                this.loading = false
                return this.$message.error('修改信息失败！')
              }
            })
          } else {
            return this.$message.warning('填写信息错误！')
          }
        })
      },
      close () {
        this.dialogMarkVisible = false
        this.closeMarkBox()
        this.callRefreshProjectList()
      },
      closeDialog () {
        this.openProject = ''
        this.closeMarkBox()
        this.callRefreshProjectList()
      },
      callRefreshProjectList () {
        this.$refs.projectListRef.getProjectList(1)
      },
      closeMarkBox () {
        console.log('调用清空')
        this.$refs.markBoxRef.clear()
      },
      openWord () {
        window.open('static/billboard.html')
      },
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
