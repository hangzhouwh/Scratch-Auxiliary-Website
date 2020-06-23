<template>
  <div class="login">
    <el-form
      :rules="rules"
      ref="loginFormRef"
      v-loading="loading"
      element-loading-text="Logining..."
      element-loading-spinner="el-icon-loading"
      :model="loginForm"
      class="loginContainer">
      <h3 class="loginTitle">User Login</h3>
      <el-form-item prop="username">
        <el-input size="normal"
                  type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="Place input username"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="normal"
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="Place input password"
                  prefix-icon="el-icon-s-goods"></el-input>
      </el-form-item>
      <el-button size="normal"
                 type="primary"
                 style="width: 100%"
                 @click="submitLogin">Login
      </el-button>
      <el-button size="normal"
                 type="success"
                 style="width: 100%"
                 @click="Register">Register
      </el-button>
    </el-form>
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
            console.log('输入是合法的')
            this.loading = true
            this.$axios.post(`/user/login/${this.loginForm.username}`, {}, {
              params: {
                password: this.loginForm.password
              }
            }).then(response => {
              console.log('response=>', response)
              if (response.data.code === 'error') {
                this.$router.push('/')
                this.loading = false
                return this.$message.error('Login Error!')
              }
              window.sessionStorage.setItem('token', response.data.token)
              this.$store.commit('postHost', this.loginForm.username)
              console.log('赋值全局变量host：' + this.$store.state.user_info.host)
              this.$axios.get(`user/${this.loginForm.username}/get_personal_info`, this.loginForm.username)
                .then(response => {
                  if (response.status === 200) {
                    console.log('获取的个人信息：')
                    console.log(response.data.data)
                    this.$store.commit('postUserInfo', response.data.data)
                    console.log('赋值给全局变量user_info：')
                    console.log(this.$store.state.user_info)
                  }
                })
              this.$router.push('/home')
              return this.$message.success('Login Success!')
            })
          } else {
            return this.$message.warning('Info Error!')
          }
        })
      },
      Register () {
        this.$router.push('/register')
      }
    }
  }
</script>
