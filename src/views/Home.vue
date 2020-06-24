<template>
  <el-container>
    <el-header></el-header>
    <el-container>
      <el-aside>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>作品列表</span>
            </template>
            <el-menu-item index="1-1">已打分</el-menu-item>
            <el-menu-item index="1-2">未打分</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view @openMarkDialog="openMarkDialog(arguments)"/>
        <el-dialog
          title="作品打分"
          :visible.sync="dialogVisible"
          width="60%">
          <markBox></markBox>
        </el-dialog>
      </el-main>
    </el-container>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
  import MarkBox from '../components/markBox'

  export default {
    name: 'Home',
    data () {
      return {
        dialogVisible: false,
        videoList: [
          {}
        ],
        openProject: {
          pid: '0001',
          videoUrl: 'videoUrl0001',
          picUrl: 'picUrl0001',
          codeUrl: 'codeUrl0001',
          sampleNum: null,
          sampleProportion: null
        }
      }
    },
    components:{
      markBox:MarkBox
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      openMarkDialog (args) {
        this.dialogVisible = true
      }
    }
  }
</script>

<style scoped>

</style>
