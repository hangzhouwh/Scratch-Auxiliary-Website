<template>
  <el-table :data="projectData"
            style="width: 100%"
            @row-dblclick="onRowdblclick">
    <el-table-column prop="videoUrl"
                     label="视频url"
                     width="180">
    </el-table-column>
    <el-table-column prop="picUrl"
                     label="图片url"
                     width="180">
    </el-table-column>
    <el-table-column prop="codeUrl"
                     label="代码url"
                     width="180">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'VideoList',
    data () {
      return {
        projectData: [
          {
            pid: '0001',
            videoUrl: 'https://player.youku.com/embed/XNDcyNjMwNzY1Ng==',
            picUrl: 'https://imgchr.com/i/NwdzhF',
            codeUrl: 'codeUrl0001',
            sampleNum: null,
            sampleProportion: null
          }
        ]
      }
    },
    methods: {
      onRowdblclick (row, event, column) {
        var pid = row.pid
        console.log(pid)
        this.$emit('openMarkDialog', pid)
      },
    }
  }
</script>

<style scoped>

</style>
