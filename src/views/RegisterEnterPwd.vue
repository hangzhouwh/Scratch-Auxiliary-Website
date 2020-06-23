<template>
  <div class="register">
    <el-form
      :rules="rules"
      ref="RegisterFormRef"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      :model="RegisterForm"
      class="loginContainer">
      <h3 class="loginTitle">User Register</h3>
      <el-form-item prop="password">
        <el-input size="normal"
                  type="password"
                  v-model="RegisterForm.password"
                  auto-complete="off"
                  placeholder="Place enter your password"
                  prefix-icon="el-icon-s-goods"></el-input>
      </el-form-item>
      <el-form-item prop="confirm">
        <el-input size="normal"
                  type="password"
                  v-model="RegisterForm.confirm"
                  auto-complete="off"
                  placeholder="Enter your password again"
                  prefix-icon="el-icon-s-goods"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input size="normal"
                  type="text"
                  v-model="RegisterForm.name"
                  auto-complete="off"
                  placeholder="Place enter your real name"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-select size="medium"
                   clearable="clearable"
                   v-model="RegisterForm.sex"
                   placeholder="Choice your sex">
          <el-option value="Male"></el-option>
          <el-option value="Female"></el-option>
        </el-select>
      </el-form-item>
      <el-button size="normal"
                 type="primary"
                 style="width: 100%"
                 @click="submitRegister">Submit
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
    created () {
      this.RegisterForm.host = this.$store.state.register_host
    },
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Place enter your password'))
        } else {
          callback()
        }
      }
      var validatePassConfirm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Place enter your password again'))
        } else if (value !== this.RegisterForm.password) {
          callback(new Error('Input password is inconsistent'))
        } else {
          callback()
        }
      }
      var validatePhoneEmail = (rule, value, callback) => {
        if (/^((13[0-9])|(15[0-9])|(147)|(17[0-9])|(18[0-9]))\d{8}$/.test(value)) {
          this.RegisterForm.phone = value
          callback()
        } else if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          this.$axios.post('/user/send_email', {}, {
            params: {
              address: value
            }
          }).then(response => {
            console.log(response)
            if (response !== 200) {
              callback(new Error('Place enter the right e-mail'))
            } else {
              this.RegisterForm.email = value
              callback()
            }
          })
        } else {
          callback(new Error('Place enter the right phone number or e-mail'))
        }
      }
      return {
        loading: false,
        RegisterForm: {
          host: null,
          password: null,
          confirm: null,
          name: null,
          sex: null,
          email: null,
          phone: null
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
            this.$axios({
              method: 'post',
              url: 'user/register',
              data: this.RegisterForm
            }).then(response => {
              console.log('response=>', response)
              if (response.status === 200) {
                this.$router.push('/')
                return this.$message.success('Register Success!')
              } else {
                return this.$message.error('Register Error!')
              }
            })
          } else {
            return this.$message.warning('Info Error!')
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
</style>
