<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
</script>
<style lang="less">
  @import "style/App";
  @import "style/font";
  @import "style/color";
  @import "style/el-table";
  @import "style/el-menu";
  @import "style/searchbar";
  @import "style/el-pagination";
  @import "style/el-tabs";
  @import "style/el-dialog";
  @import "style/login-register";
  @import "style/el-button";
  @import "style/el-slider";
  @import "style/el-popover";
  @import "style/el-option";
  @import "style/el-tooltip";

  * {
    /*border: 0.1px solid crimson;*/
  }

  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, sans-serif;
    font-size: 16px;
    display: block;
    background-image: url('assets/background2.jpg')
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
