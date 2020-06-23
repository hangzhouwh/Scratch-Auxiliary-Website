<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
</script>
<style lang="less">
  @import "style/App";

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
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
