<template>
  <div>
    <h1 align="center" style="margin-top: 100px">可视化编程计算思维评测</h1>
    <el-form
      :rules="rules"
      ref="loginFormRef"
      class="login-container"
      v-loading="loading"
      element-loading-text="登陆中"
      element-loading-spinner="el-icon-loading"
      :model="loginForm">
      <h3 class="login-title">用户登录</h3>
      <el-form-item prop="username">
        <el-input size="normal"
                  type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="normal"
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="请输入密码"
                  prefix-icon="el-icon-s-goods"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="normal"
                   type="primary"
                   style="width: 100%"
                   @click="submitLogin">登录
        </el-button>
      </el-form-item>
      <!--    <el-form-item>-->
      <!--      <el-button size="normal"-->
      <!--                 type="success"-->
      <!--                 style="width: 100%"-->
      <!--                 disabled-->
      <!--                 @click="register">注册-->
      <!--      </el-button>-->
      <!--    </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button size="normal"-->
<!--                   type="warning"-->
<!--                   style="width: 100%"-->
<!--                   @click="ifForget">修改密码-->
<!--        </el-button>-->
<!--      </el-form-item>-->
      <el-link type="primary" @click="openWord()">使用前请看此用户说明</el-link>
<!--      <el-link type="primary" @click="openCreateUserPage()">录入受邀请老师（非管理员勿入）</el-link>-->
    </el-form>
    <h4 align="center">浙大城市学院智慧教育研究组</h4>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        }
      }
    },
    methods: {
      submitLogin () {
        this.$refs.loginFormRef.validate((valid) => {
          if (valid) {
            this.loading = true
            this.postRequest(`/user/login/${this.loginForm.username}`, {
              password: this.loginForm.password
            }).then(resp => {
              if (resp) {
                this.loading = false
                this.$store.dispatch('setHost', resp.data.host)
                this.getRequest(`/user/${this.loginForm.username}/get_personal_info`).then(resp => {
                  if (resp) {
                    this.$store.dispatch('setUser', resp.data)
                  }
                })
                this.$router.push('/home')
              }else{
                this.loading = false
                this.$message.error('登录出错！')
              }
            })
          } else {
            this.$message.success('请输入正确的账户密码！')
          }
        })
      },
      register () {
        this.$router.push('/register')
      },
      ifForget () {
        this.$router.push('/ifForget')
      },
      openWord () {
        window.open('static/billboard.html')
      },
      openCreateUserPage () {
        this.$router.push('/createUser')
      }
    }
  }
</script>
<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 80px auto 0 auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login-title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
