<template>
  <el-form
    :rules="rules"
    ref="VerificationFormRef"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    :model="VcForm"
    class="login-container">
    <h3 class="login-title">用户注册</h3>
    <el-form-item prop="input">
      <el-input size="normal"
                type="text"
                v-model="VcForm.input"
                auto-complete="off"
                placeholder="请输入邮箱"
                prefix-icon="el-icon-user-solid"></el-input>
    </el-form-item>
    <el-form-item prop="vc">
      <el-input size="normal"
                type="text"
                v-model="VcForm.vc"
                auto-complete="off"
                placeholder="请输入验证码"
                prefix-icon="el-icon-user-solid">
        <el-button slot="append"
                   @click="sendCode">发送验证码
        </el-button>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="normal"
                 type="primary"
                 style="width: 100%"
                 @click="submitRegister">验证
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
      var validatePhoneEmail = (rule, value, callback) => {
        if (/^((13[0-9])|(15[0-9])|(147)|(17[0-9])|(18[0-9]))\d{8}$/.test(value)) {
          this.type = 'phone'
          callback()
        } else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          this.type = 'email'
          callback()
        } else {
          callback(new Error('请输入正确的邮箱'))
        }
      }
      return {
        loading: false,
        VcForm: {
          input: null,
          vc: null
        },
        realVc: null,
        type: null,
        rules: {
          input: [{required: true, validator: validatePhoneEmail, trigger: 'blur'}],
          vc: [{required: true, trigger: 'blur'}]
        }
      }
    },
    methods: {
      submitRegister () {
        console.log('提交验证码')
        if (this.VcForm.vc === this.realVc) {
          this.$store.dispatch('setREmail', this.VcForm.input)
          this.$message.success('验证码正确！')
          this.$router.push('/registerEnterPwq')
        } else {
          this.$message.error('验证码错误！')
        }
      },
      sendCode () {
        if (this.VcForm.input !== null) {
          console.log(this.type)
          if (this.type === 'email') {
            this.postRequest('/user/send_email', {
              address: this.VcForm.input
            }).then(resp => {
              console.log(resp)
              if (resp) {
                this.realVc = resp.data.vc
                this.$message.success('验证码已发送！')
              }else{
                this.$message.error('验证码发送失败！')
              }
            })
          } else {
            this.$message.error('邮箱填写错误！')
          }
        } else {
          this.$message.error('请输入正确的邮箱！')
        }
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
