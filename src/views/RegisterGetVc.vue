<template>
  <div class="register">
    <el-form
      :rules="rules"
      ref="VerificationFormRef"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      :model="RegisterForm"
      class="loginContainer">
      <h3 class="loginTitle">User Register</h3>
      <el-form-item prop="host">
        <el-input size="normal"
                  type="text"
                  v-model="RegisterForm.host"
                  auto-complete="off"
                  placeholder="Place enter your phone or e-mail"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="vc">
        <el-input size="normal"
                  type="text"
                  v-model="RegisterForm.vc"
                  auto-complete="off"
                  placeholder="Place enter verification code"
                  prefix-icon="el-icon-user-solid">
          <el-button slot="append"
                     @click="sendCode">Send code
          </el-button>
        </el-input>
      </el-form-item>
      <el-button size="normal"
                 type="primary"
                 style="width: 100%"
                 @click="submitRegister">Verify
      </el-button>
      <el-button size="normal"
                 type="success"
                 style="width: 100%"
                 @click="cancel">Cancel
      </el-button>
    </el-form>
  </div>
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
        } else {
          callback(new Error('Place enter the right phone number or e-mail'))
        }
      }
/*      var validateVc = (rule, value, callback) => {
        if (/^([a-zA-z0-9])$/.test(value)) {
          callback()
        } else {
          callback(new Error('Place enter the right verification code'))
        }
      }*/
      return {
        loading: false,
        RegisterForm: {
          host: null,
          vc: null
        },
        realVc: null,
        type: null,
        rules: {
          host: [{required: true, validator: validatePhoneEmail, trigger: 'blur'}],
          vc: [{required: true,trigger: 'blur'}]
        }
      }
    },
    methods: {
      submitRegister () {
        console.log('提交验证码')
        if(this.RegisterForm.vc===this.realVc){
          this.$store.commit('postRegisterHost',this.RegisterForm.host)
          this.$message.success('Verification code is right!')
          this.$router.push('/registerEnterPwq')
        }else{
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
        if (this.RegisterForm.host !== null) {
          console.log('host not null')
          if (this.type === 'phone') {
            this.$axios.post('/user/send_msg', {}, {
              params: {
                phone: this.RegisterForm.host
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
            console.log('host is email')
            this.$axios.post('/user/send_email', {}, {
              params: {
                address: this.RegisterForm.host
              }
            }).then(response => {
              console.log(response)
              if (response.status !== 200) {
                this.$message.error('Verification code have some error!')
              }
              this.realVc = response.data.data.vc
              this.$message.success('Verification code have already sent!')
            })
          } else {
            this.$message.error('phone or email error!')
          }
        } else {
          this.$message.error('Place enter phone or email')
        }
      },
      cancel () {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
</style>
