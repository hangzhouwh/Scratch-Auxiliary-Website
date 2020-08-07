<template>
  <div>
    <h1 align="center" style="margin-top: 100px">可视化编程计算思维评测</h1>
    <el-form
      :rules="rules"
      ref="RegisterFormRef"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      :model="RegisterForm"
      class="login-container">
      <h3 class="login-title">录入用户</h3>
      <el-form-item prop="host">
        <el-input size="normal"
                  type="text"
                  v-model="RegisterForm.host"
                  auto-complete="off"
                  placeholder="请输入教师姓名"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input size="normal"
                  type="text"
                  v-model="RegisterForm.phone"
                  auto-complete="off"
                  placeholder="请输入手机号"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="normal"
                   type="primary"
                   style="width: 100%"
                   @click="submitRegister">录入
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
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入正确的手机号'))
        }
        if (/^((13[0-9])|(15[0-9])|(147)|(17[0-9])|(18[0-9]))\d{8}$/.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号'))
        }
      }
      return {
        loading: false,
        RegisterForm: {
          host: null,
          phone: null,
        },
        rules: {
          host: [{required: true, message: '教师姓名不能为空', trigger: 'blur'}],
          phone: [{required: true, validator: validatePhone, trigger: 'blur'}],
        }
      }
    },
    methods: {
      submitRegister () {
        this.$refs.RegisterFormRef.validate((valid) => {
          console.log(this.RegisterForm)
          if (valid) {
            this.loading = true
            this.postRequest2('/user/preinstall',
              this.RegisterForm
            ).then(response => {
              console.log('response=>', response)
              this.loading = false
              if (response) {
                if (response.code == 200) {
                  this.$message.success('录入成功！')
                  this.RegisterForm.host=null
                  this.RegisterForm.phone=null
                  return
                } else {
                  return this.$message.error(response.msg)
                }
              } else {
                return this.$message.error('录入出错！')
              }
            })
          } else {
            return this.$message.error('请填写正确的用户名与手机号！')
          }
        })
      },
      cancel () {
        this.$router.push('/home')
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
