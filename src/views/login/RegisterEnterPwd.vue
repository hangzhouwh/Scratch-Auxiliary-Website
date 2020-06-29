<template>
  <el-form
    :rules="rules"
    ref="RegisterFormRef"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    :model="RegisterForm"
    class="login-container">
    <h3 class="login-title">用户注册</h3>
    <el-form-item prop="host">
      <el-input size="normal"
                type="text"
                v-model="RegisterForm.host"
                auto-complete="off"
                placeholder="请输入用户名"
                prefix-icon="el-icon-user-solid"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="normal"
                type="password"
                v-model="RegisterForm.password"
                auto-complete="off"
                placeholder="请输入密码"
                prefix-icon="el-icon-s-goods"></el-input>
    </el-form-item>
    <el-form-item prop="confirm">
      <el-input size="normal"
                type="password"
                v-model="RegisterForm.confirm"
                auto-complete="off"
                placeholder="请再次输入你的密码"
                prefix-icon="el-icon-s-goods"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="normal"
                 type="primary"
                 style="width: 100%"
                 @click="submitRegister">注册
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button size="normal"
                 type="success"
                 style="width: 100%"
                 @click="cancel">取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      var validatePassConfirm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.RegisterForm.password) {
          callback(new Error('两遍密码不一致'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        RegisterForm: {
          host: null,
          password: null,
          confirm: null
        },
        rules: {
          password: [{required: true, validator: validatePass, trigger: 'blur'}],
          confirm: [{required: true, validator: validatePassConfirm, trigger: 'blur'}],
        }
      }
    },
    methods: {
      submitRegister () {
        this.$refs.RegisterFormRef.validate((valid) => {
          console.log(this.RegisterForm)
          if (valid) {
            console.log('提交的注册信息的合法的')
            this.loading = true
            this.postRequest2('/user/register',
              this.RegisterForm
            ).then(response => {
              console.log('response=>', response)
              if (response) {
                if (response.code == 200) {
                  this.$store.dispatch('setRHost', this.RegisterForm.host)
                  this.$router.push('/completionUserInfo')
                  return this.$message.success('注册成功！')
                } else {
                  return this.$message.success(response.msg)
                }
              } else {
                this.$router.push('/registerEnterPwq')
                return this.$message.error('注册出错！')
              }
            })
          } else {
            return this.$message.error('注册出错！')
          }
        })
      },
      cancel () {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
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
