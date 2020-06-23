<template>
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
    <el-form-item>
      <el-button size="normal"
                 type="primary"
                 style="width: 100%"
                 @click="submitLogin">登录
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button size="normal"
                 type="success"
                 style="width: 100%">注册
      </el-button>
    </el-form-item>
  </el-form>
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
            this.$router.push('/register')
          } else {
            return this.$message.warning('用户名或密码错误！')
          }
        })
      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
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
