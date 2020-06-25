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
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
  import {videoPlayer} from 'vue-video-player'

  export default {
    name: 'myMarkBox',
    created () {
    },
    data () {
      return {
        activeNames: ['1'],
        projectData: {
          pid: '0001',
          videoUrl: 'https://player.youku.com/embed/XNDcyNjMxMDA4OA==',
          picUrl: 'https://s1.ax1x.com/2020/06/24/NwdzhF.png'
        },
        markForm: {
          score: ''
        }
      }
    },
    components: {
      videoPlayer
    },
    methods: {
      handleChange (val) {
        console.log(val)
      },
      onSubmit () {
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
