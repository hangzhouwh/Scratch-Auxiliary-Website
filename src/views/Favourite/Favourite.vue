<template>
  <el-main>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick">
      <el-tab-pane label="Favourite Song" name="song"></el-tab-pane>
      <el-tab-pane label="Favourite Artists" name="artist"></el-tab-pane>
    </el-tabs>
    <router-view @audioplay="audioplay(arguments)"></router-view>
  </el-main>

</template>

<script>
  export default {
    data () {
      return {
        activeName: 'song',
        songs:[],
        index:''
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab.name)
        switch (tab.name) {
          case 'song': {
            this.$router.push('/favourite/song')
            return console.log('显示收藏的歌曲')
          }
          case 'artist': {
            this.$router.push('/favourite/artists')
            return console.log('显示收藏的歌手')
          }
        }
      },
      audioplay (args) {
        this.songs = args[0]
        this.index = args[1]
        console.log('由FavouriteSong传递到Favourite的两个参数分别为:')
        console.log(this.songs)
        console.log(this.index)
        this.$emit('audioplay',this.songs,this.index)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
