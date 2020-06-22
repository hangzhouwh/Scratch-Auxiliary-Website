<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo h-100p "
    :router="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <div class="logo m-16 h-32">
      <p class="lh-32 text-center text-white fs-24">管理平台</p>
    </div>
    <el-submenu index="base">
      <template slot="title">
        <i class="el-icon-location" />
        <span>作品列表</span>
      </template>
      <el-menu-item index="/base/home">base_home</el-menu-item>
      <el-menu-item index="/base/home2">base_home2</el-menu-item>
      <el-menu-item index="/base/login">login</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: 'SiderMenu',
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  methods: {}
}
</script>
<style scoped lang="scss">
  .demo-block.demo-menu .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
  }

  .el-menu--collapse {
    width: 64px;
  }

  li.is-active {
    background-color: rgb(64, 74, 80) !important;
  }
</style>
