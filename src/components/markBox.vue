<template>
  <div class="mark-wrapper">
    <div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="视频" name="1">
          <video-player class="video-player-box"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true">
          </video-player>
        </el-collapse-item>
        <el-collapse-item title="图片" name="2">
          <el-image :src="projectData.picUrl">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-collapse-item>
        <el-collapse-item title="代码" name="3">
        <pre>
          <code>
            {{this.codeData}}
          </code>
        </pre>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div>
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
          videoUrl: 'videoUrl0001',
          picUrl: 'picUrl0001',
          codeUrl: 'codeUrl0001',
          sampleNum: null,
          sampleProportion: null
        },
        playerOptions: {
          muted: false,
          autoplay: true,
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          preload: 'auto',
          aspectRatio: '16:9',
          fluid: true,
          sources: [{
            type: 'video/mp4',
            src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
          }],
          poster: '/static/images/author.jpg',
        },
        codeData: {
          id: '9',
          children: [{
            'id': '8',
            'children': [{
              'id': '7',
              'children': [{
                'id': '6',
                'children': [
                  {
                    'id': '0',
                    'type': 'isPathForward'
                  },
                  {
                    'id': '2',
                    'children': [{
                      'id': '1',
                      'type': 'maze_moveForward'
                    }],
                    'type': 'DO'
                  },
                  {
                    'id': '5',
                    'children': [{
                      'id': '4',
                      'children': [{
                        'id': '3',
                        'type': 'turnLeft'
                      }],
                      'type': 'maze_turn'
                    }],
                    'type': 'ELSE'
                  }
                ],
                'type': 'maze_ifElse'
              }],
              'type': 'DO'
            }],
            'type': 'maze_forever'
          }],
          type: 'program'
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

  .video-player-box {
    width: 400px;
  }

  pre {
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 1em 0px;
  }
</style>
