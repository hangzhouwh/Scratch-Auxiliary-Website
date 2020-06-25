<template>
  <div class="mark-wrapper">
    <div>
      <div style="width: 410px"></div>
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
               label-width="80px">
        <el-form-item label="分数">
          <el-input v-model="markForm.score"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitMark">确定</el-button>
          <el-button>取消</el-button>
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
      return {
        activeNames: ['1'],
        markForm: {
          score: ''
        }
      }
    },
    methods: {
      handleChange (val) {
        console.log(val)
      },
      onSubmitMark () {
        this.postRequest(`mark/submit_mark/${this.$store.getters.host}`, {
          score: this.markForm.score,
          pid: this.projectData.pid
        }).then(resp => {
          if (resp) {
            this.$emit('close')
          }
        })
        console.log('submit!')
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
