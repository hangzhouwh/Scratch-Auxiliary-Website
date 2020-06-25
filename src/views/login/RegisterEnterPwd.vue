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
<!--    <el-form-item prop="school">
      <el-select size="medium"
                 clearable="clearable"
                 v-model="RegisterForm.school"
                 placeholder="选择学校"
                 style="width:100%">
        <el-option
          v-for="item in schoolOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px; margin-left: 20px">{{ item.value }}</span>
        </el-option>
      </el-select>
    </el-form-item>-->
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
  import {validatePass} from '../../utils/validate'
  import {validatePassConfirm} from '../../utils/validate'

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
        },
        schoolOption: [
          {
            value: 'Zhejiang University City College',
            label: '浙大城市学院'
          }
        ]
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
