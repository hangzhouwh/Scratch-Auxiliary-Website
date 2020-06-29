<template>
  <div class="mark-wrapper">
    <div>
      <div style="width: 410px">
        <span>
          <h2>{{projectData.pid}}</h2>
        </span>
      </div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="视频" name="1">
          <iframe height=225 width=400 :src='projectData.videoUrl'></iframe>
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

    <div>
      <div style="height: 100px"></div>
      <el-form ref="markFormRef"
               :model="markForm"
               :rules="rules"
               label-width="80px">
        <el-form-item label="分数" prop="score">
          <el-input v-model="markForm.score"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitMark">确定</el-button>
        </el-form-item>
      </el-form>
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
          callback(new Error('请输入0-100的分数'))
        }
      }
      return {
        activeNames: ['1'],
        markForm: {
          score: ''
        },
        rules: {
          score: [{required: true, validator: validateScore, trigger: 'blur'}],
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
              pid: this.projectData.pid
            }).then(resp => {
              if (resp) {
                console.log(resp)
                this.$emit('close')
              }
            })
          }else{
            this.$message.success('输入的分数不在范围内！')
          }
        })
      }
    }
  }
</script>

<style lang="css" scoped>
  .mark-wrapper {
    display: flex;
    flex-direction: row;
  }

  pre {
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 1em 0px;
  }
</style>
