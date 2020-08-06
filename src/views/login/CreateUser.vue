<template>
  <div>
    <h3 align="center">可视化编程计算思维评测</h3>
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
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-user-solid"></el-input>
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
    <h4 align="center">浙大城市学院智慧教育研究组</h4>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        RegisterForm: {
          host: null,
          password: 123456
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
              this.loading = false
              if (response) {
                if (response.code == 200) {
                  return this.$message.success('注册成功！')
                } else {
                  return this.$message.error(response.msg)
                }
              } else {
                return this.$message.error('注册出错！')
              }
            })
          } else {
            return this.$message.error('请填写合法的用户名！')
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
