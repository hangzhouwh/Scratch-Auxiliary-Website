<template>
  <el-form
    :rules="rules"
    ref="UserInfoFormRef"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    :model="userInfoForm"
    class="login-container">
    <h3 class="login-title">完善信息</h3>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="userInfoForm.name"
                placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="userInfoForm.phone"
                placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="学校" prop="school">
      <el-input v-model="userInfoForm.school"
                placeholder="请输入就职学校"></el-input>
    </el-form-item>
    <el-form-item label="职称" prop="title">
      <el-select v-model="userInfoForm.title" placeholder="请选择职称" style="width:100%">
        <el-option
          v-for="item in optionTitle"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="学历" prop="degree">
      <el-select v-model="userInfoForm.degree" placeholder="请选择学历" style="width:100%">
        <el-option
          v-for="item in optionDegree"
          :key="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="教授课程" prop="course">
      <el-input v-model="userInfoForm.course"
                placeholder="请输入教授课程"></el-input>
    </el-form-item>
    <el-form-item label="教龄" prop="yearOfTeaching">
      <el-select v-model="userInfoForm.yearOfTeaching" placeholder="请选择教龄" style="width:100%">
        <el-option
          v-for="item in optionYearOfTeaching"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button size="normal"
                 type="primary"
                 style="width: 100%"
                 @click="submitUserInfo">完成
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
    created () {
      this.userInfoForm.host = this.$store.getters.rhost
      this.userInfoForm.email = this.$store.getters.reamil
    },
    data () {
      var validateNotNull = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('信息不能为空'))
        } else {
          return callback()
        }
      }
      return {
        loading: false,
        userInfoForm: {
          host: null,
          password: null,
          name: null,
          email: null,
          phone: null,
          school: null,
          title: null,
          degree: null,
          course: null,
          yearOfTeaching: null
        },
        rules: {
          host: [{required: true, validator: validateNotNull, trigger: 'blur'}],
          password: [{required: true, validator: validateNotNull, trigger: 'blur'}],
          name: [{required: true, validator: validateNotNull, trigger: 'blur'}],
          email: [{required: true, validator: validateNotNull, trigger: 'blur'}],
          phone: [{required: true, validator: validateNotNull, trigger: 'blur'}],
          school: [{required: true, validator: validateNotNull, trigger: 'blur'}],
          title: [{required: true, validator: validateNotNull, trigger: 'blur'}],
          degree: [{required: true, validator: validateNotNull, trigger: 'blur'}],
          course: [{required: true, validator: validateNotNull, trigger: 'blur'}],
          yearOfTeaching: [{required: true, validator: validateNotNull, trigger: 'blur'}],
        },
        optionTitle: [
          {
            value: '正高级教师'
          },
          {
            value: '高级教师'
          },
          {
            value: '一级教师'
          },
          {
            value: '二级教师'
          },
          {
            value: '三级教师'
          }
        ],
        optionDegree: [
          {
            value: '大学本科以上'
          },
          {
            value: '硕士研究生以上'
          },
          {
            value: '博士研究生以上'
          },
        ],
        optionYearOfTeaching: [
          {
            value: '1',
            label: '一年以上'
          },
          {
            value: '2',
            label: '两年以上'
          },
          {
            value: '3',
            label: '三年以上'
          },
          {
            value: '5',
            label: '五年以上'
          },
          {
            value: '10',
            label: '十年以上'
          },
          {
            value: '15',
            label: '十五年以上'
          },
          {
            value: '20',
            label: '二十年以上'
          },
          {
            value: '30',
            label: '三十年以上'
          },
        ]
      }
    },
    methods: {
      submitUserInfo () {
        this.$refs.UserInfoFormRef.validate((valid) => {
          console.log(this.userInfoForm)
          if (valid) {
            console.log('提交的注册信息的合法的')
            this.loading = true
            this.postRequest2('/user/edit_personal_info',
              this.userInfoForm
            ).then(response => {
              console.log('response=>', response)
              if (response) {
                this.$store.dispatch('clearRegister', true)
                this.$router.push('/')
                return this.$message.success('完善信息成功！')
              } else {
                return this.$message.error('完善信息失败！')
              }
            })
          } else {
            return this.$message.warning('填写信息错误或不完整！')
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
