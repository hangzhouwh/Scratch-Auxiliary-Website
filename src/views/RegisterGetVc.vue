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
    <el-form-item prop="host">
      <el-input size="normal"
                type="text"
                v-model="VcForm.input"
                auto-complete="off"
                placeholder="请输入邮箱或手机号"
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
  import {validatePhoneEmail} from '../utils/validate'

  export default {
    data () {
      return {
        loading: false,
        VcForm: {
          input: null,
          vc: null
        },
        realVc: null,
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
          this.$store.commit('postRegisterHost', this.VcForm.input)
          this.$message.success('Verification code is right!')
          this.$router.push('/registerEnterPwq')
        } else {
          this.$message.error('Verification code is error!')
        }
        /*this.$refs.VerificationFormRef.validate((valid) => {
          console.log(this.RegisterForm)
          if (valid) {
            console.log('提交的注册信息的合法的')
            this.loading = true

          } else {
            return this.$message.warning('Info Error!')
          }
        })*/
      },
      sendCode () {
        if (this.VcForm.input !== null) {
          if (this.type === 'phone') {
            this.$axios.post('/user/send_msg', {}, {
              params: {
                phone: this.VcForm.input
              }
            }).then(response => {
              console.log(response)
              if (response.status !== 200) {
                this.$message.error('Verification code have some error!')
              }
              this.realVc = response.data.data.vc
              this.$message.success('Verification code have already sent!')
            })
          } else if (this.type === 'email') {
            this.postRequest('/user/send_email', {
              address: this.VcForm.input
            }).then(resp => {
              console.log(resp)
              if (resp) {
                this.realVc = resp.data.vc
                this.$message.success('验证码已发送！')
              }
              this.$message.error('验证码发送失败！')
            })
          } else {
            this.$message.error('邮箱填写错误！')
          }
        } else {
          this.$message.error('请输入邮箱！')
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
