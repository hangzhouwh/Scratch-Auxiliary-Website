<template>
  <div>
    <h3 align="center">可视化编程计算思维评测</h3>
    <el-form
      :rules="rules"
      ref="changePwdFormRef"
      class="login-container"
      v-loading="loading"
      element-loading-text="提交中"
      element-loading-spinner="el-icon-loading"
      :model="changePwdForm">
      <h3 class="login-title">修改密码</h3>
      <el-form-item prop="username">
        <el-input size="normal"
                  type="text"
                  v-model="changePwdForm.username"
                  auto-complete="off"
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="normal"
                  type="password"
                  v-model="changePwdForm.password"
                  auto-complete="off"
                  placeholder="请输入密码"
                  prefix-icon="el-icon-s-goods"></el-input>
      </el-form-item>
      <el-form-item prop="confirm">
        <el-input size="normal"
                  type="password"
                  v-model="changePwdForm.confirm"
                  auto-complete="off"
                  placeholder="请再次输入你的密码"
                  prefix-icon="el-icon-s-goods"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="normal"
                   type="primary"
                   style="width: 100%"
                   @click="submitLogin">确定
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
    <h4 align="center">浙大城市学院智慧教育研究组</h4>
  </div>

</template>

<script>
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      var validatePassConfirm = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.changePwdForm.password) {
          callback(new Error('两遍密码不一致'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        changePwdForm: {
          host: null,
          password: null,
          confirm: null
        },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, validator: validatePass, trigger: 'blur'}],
          confirm: [{required: true, validator: validatePassConfirm, trigger: 'blur'}],
        }
      }
    },
    methods: {
      submitLogin () {
        this.$refs.changePwdFormRef.validate((valid) => {
          if (valid) {
            this.loading = true
            this.postRequest(`/user/${this.changePwdForm.username}/edit_pwd`, {
              pwd1: this.changePwdForm.password,
              pwd2: this.changePwdForm.confirm
            }).then(resp => {
              this.loading = false
              if (resp) {
                this.$router.push('/')
              } else {
                this.$message.error('用户名不存在！')
              }
            })
          } else {
            this.$message.error('请填写正确的用户名！')
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
