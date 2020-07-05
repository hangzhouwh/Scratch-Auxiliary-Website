<template>
  <div>
    <div>
      <div style="width: 510px" class="mark-wrapper">
        <div>
          <span>
          <h2>作品编号：{{projectData.pid}}</h2>
          <h3>下方点击可展开/折叠作品视频与代码</h3>
            <h3>打分后可在已打分列表修改对作品的打分</h3>
        </span>
        </div>
        <div>
          <el-form
            ref="markFormRef"
            :model="markForm"
            :rules="rules">
            <el-form-item label="分数" prop="score">
              <el-input v-model="markForm.score"></el-input>
            </el-form-item>
            <el-form-item label="评分依据" prop="basis">
              <el-input
                type="textarea"
                v-model="markForm.basis"
                maxlength="200"
                show-word-limit>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitMark">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-collapse v-model="activeNames"
                   @change="handleChange"
                   :accordion="false">
        <el-collapse-item title="视频" name="1">
          <iframe height=400 width=700 :src='projectData.videoUrl'></iframe>
        </el-collapse-item>
        <el-collapse-item title="图片" name="2">
          <el-image :src="projectData.picUrl">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myMarkBox',
    props: {
      projectData: {
        type: Object,
        required: true
      }
    },
    created () {
      console.log(this.projectData)
    },
    data () {
      var validateScore = (rule, value, callback) => {
        if (!/^([0-9]{1,2}|100)$/.test(value)) {
          return callback(new Error('请输入0-100的分数'))
        } else {
          return callback()
        }
      }
      return {
        activeNames: ['1', '2'],
        markForm: {
          score: '',
          basis: ''
        },
        rules: {
          score: [{required: true, validator: validateScore, trigger: 'blur'}],
          basis: [{required: true, message:'请输入200字以内的评分依据',trigger: 'blur'}],
        }
      }
    },
    methods: {
      handleChange (val) {
        console.log(val)
      },
      onSubmitMark () {
        this.$refs.markFormRef.validate((valid) => {
          if (valid) {
            this.postRequest(`/mark/submit_mark/${this.$store.getters.host}`, {
              score: this.markForm.score,
              basis:this.markForm.basis,
              pid: this.projectData.pid
            }).then(resp => {
              if (resp) {
                console.log(resp)
                this.$emit('close')
              }
            })
          } else {
            this.$message.success('输入的分数不在范围内！')
          }
        })
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
