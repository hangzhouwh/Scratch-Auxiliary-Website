<template>
  <el-main>
    <el-tabs
      style="width: 95%"
      v-model="activeName"
      @tab-click="handleClick">
      <el-tab-pane label="Songs" name="song"></el-tab-pane>
      <el-tab-pane label="Artists" name="artist"></el-tab-pane>
      <el-tab-pane label="Playlists" name="sheet"></el-tab-pane>
      <el-tab-pane label="Lyrics" name="lyric"></el-tab-pane>
    </el-tabs>
    <router-view @reload="reload"
      @audioplay="audioplay(arguments)"></router-view>
  </el-main>

</template>

<script>
  export default {
    data () {
      return {
        host: 'wuh1234',
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
            this.$router.push('/searchResult/song')
            return console.log('显示歌曲搜索结果')
          }
          case 'artist': {
            this.$router.push('/searchResult/artists')
            return console.log('显示歌手搜索结果')
          }
          case 'sheet': {
            this.$router.push('/searchResult/sheet')
            return console.log('显示歌单搜索结果')
          }
          case 'lyric': {
            this.$router.push('/searchResult/lyrics')
            return console.log('显示歌词搜索结果')
          }
        }
      },
      audioplay (args) {
        this.songs = args[0]
        this.index = args[1]
        console.log('由SearchResultSong传递到SearchResult的两个参数分别为:')
        console.log(this.songs)
        console.log(this.index)
        this.$emit('audioplay',this.songs,this.index)
      },
      reload(){
        this.$emit('reload')
      },
    }
  }
</script>

<style lang="scss" scoped>
</style>
