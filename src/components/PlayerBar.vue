<template>
  <el-container class="container-player">
    <div class="bottom">
      <!--左侧专辑封面、歌曲名与歌手名展示 start-->
      <div class="song_info">
        <el-avatar class="song_info_album"
                   shape="square"
                   :size="50"
                   slot="reference"
                   :src="current_song.pic_url"
                   @click.native="handleAvatarClick()"></el-avatar>
        <div class="song_info_name">
          <div><h3>{{current_song.song_name}}</h3></div>
          <div><h3>{{current_song.artist_name}}</h3></div>
        </div>
      </div>
      <!--左侧专辑封面、歌曲名与歌手名展示 end-->
      <div class="main_control">
        <LottiePreviousTrack ref="previousTrackRef"
                             @click.native="previewSong"
                             @mouseenter.native="$refs.previousTrackRef.play()"
                             @mouseleave.native="$refs.previousTrackRef.stop()"></LottiePreviousTrack>
        <LottiePausePlay ref="pausePlayRef"
                         @click.native="startPlayOrPause"
                         @mouseenter.native=""
                         @mouseleave.native=""></LottiePausePlay>
        <LottieNextTrack ref="nextTrackRef"
                         @click.native="nextSong"
                         @mouseenter.native="$refs.nextTrackRef.play()"
                         @mouseleave.native="$refs.nextTrackRef.stop()"></LottieNextTrack>
      </div>

      <el-slider class="progress"
                 ref="sliderRef"
                 v-model="audio_time.progress"
                 :show-tooltip="false"
                 @change="handleSliderChange"></el-slider>

      <div class="sub_control">
        <LottieMute ref="muteRef"
                    @click.native="setAudioMutedOrNot"></LottieMute>
        <el-slider ref="volumeRef"
                   v-model="audio_volume.value"
                   :show-tooltip="false"
                   @change="handleSliderChange2"></el-slider>
      </div>
    </div>
  </el-container>
</template>

<script>
  import LottiePausePlay from './buttonIcon/LottiePausePlay'
  import LottieNextTrack from './buttonIcon/LottieNextTrack'
  import LottiePreviousTrack from './buttonIcon/LottiePreviousTrack'
  import LottieMute from './buttonIcon/LottieMute'

  let audio = new Audio()
  export default {
    name: 'PlayerBar',
    components: {
      LottiePausePlay,
      LottieNextTrack,
      LottiePreviousTrack,
      LottieMute
    },
    created () {
      this.host = this.$store.state.user_info.host
    },
    data () {
      return {
        host: '',
        audio: {
          playing: false,
        },
        current_song: {
          artist_id: '',
          artist_name: '',
          index: 3,
          pic_url: '',
          release: '',
          song_id: '',
          song_name: ''
        },
        audio_time: {
          timer: '',
          current_time: null,
          progress: null
        },
        audio_volume: {
          value: 100,
          is_muted: false
        },
        audioUrl: ''
      }
    },
    methods: {
      startPlayOrPause () {
        console.log('音乐是否在播放' + this.audio.playing)
        return this.audio.playing ? this.onPause() : this.ButtonPlay()
      },
      onPlay (currentSong) {
        this.current_song = currentSong
        this.audioUrl = `http://music.163.com/song/media/outer/url?id=${currentSong.song_id}.mp3`
        console.log('将要播放的歌曲的url:')
        console.log(this.audioUrl)
        console.log('开始播放音乐')
        audio.src = this.audioUrl
        audio.play()
        this.$refs.pausePlayRef.play()
        this.setAudioInterval()
        this.addSongPlayRecord()
        this.audio.playing = true
      },
      rePlay () {
        audio.play()
        this.$refs.pausePlayRef.play()
        this.setAudioInterval()
        this.audio.playing = true
      },
      onPause () {
        console.log('暂停播放音乐')
        audio.pause()
        clearInterval(this.audio_time.timer)
        this.$refs.pausePlayRef.stop()
        this.audio.playing = false
      },
      previewSong () {
        this.$emit('preview')
      },
      nextSong () {
        this.$emit('next')
      },
      addSongPlayRecord () {
        this.$axios.post(`user/${this.host}/add_record?song_id=${this.current_song.song_id}`)
          .then(response => {
            if (response.status === 200) {
              return this.$message.success('歌曲添加到播放记录！')
            }
          })
      },
      ButtonPlay () {
        this.$emit('audioplay')
      },
      getCurrentTime () {
        this.audio_time.current_time = audio.currentTime
        /*        console.log('当前播放到时长:' + this.audio_time.current_time)*/
        /*        console.log('歌曲总时长:' + audio.duration)*/
        this.audio_time.progress = this.audio_time.current_time / audio.duration * 100
        /*        console.log('当前进度条:' + this.audio_time.progress)*/
        if (this.audio_time.progress === 100) {
          clearInterval(this.audio_time.timer)
          this.nextSong()
        }
      },
      setAudioInterval () {
        this.audio_time.timer = setInterval(this.getCurrentTime, 1000)
      },
      handleSliderChange () {
        var progress = this.audio_time.progress
        console.log('【歌曲进度】滑动条的值为:' + progress)
        audio.currentTime = ((progress / 100) * audio.duration)
      },
      handleSliderChange2 () {
        var progress = this.audio_volume.value
        console.log('【音量】滑动条的值为:' + progress)
        audio.volume = (progress / 100)
      },
      setAudioMutedOrNot () {
        var progress = this.audio_volume.value
        this.audio_volume.is_muted === true ? this.audio_volume.is_muted = false : this.audio_volume.is_muted = true
        if (this.audio_volume.is_muted) {
          this.$refs.muteRef.stop()
          audio.volume = 0
        } else {
          this.$refs.muteRef.play()
          audio.volume = (progress / 100)
        }
      },
      handleAvatarClick () {
        console.log(this.current_song.song_id)
        this.$emit('showLyric',this.current_song.song_id)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .container-player {
    display: block;
    position: fixed;
    background-color: $background-main-color;
    bottom: 0;
    right: 0;
    left: 0;
    height: 110px;
    align-items: center;
    box-shadow: -10px 0px 20px $background-playbar-shadow-color;

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;

      .song_info {
        width: 200px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 30px;

        .song_info_name {
          width: 110px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 10px;

          div {
            h3 {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 5px;
              color: white;
            }
          }
        }
      }

      .main_control {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
      }

      .progress {
        width: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .sub_control {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 200px;
        margin-right: 30px;

        .el-slider {
          width: 60px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-left: 25px;
        }
      }
    }
  }
</style>
