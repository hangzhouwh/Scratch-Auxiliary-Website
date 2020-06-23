<template>
  <div id="app">
    <lottie :options="defaultOptions" :width="40" v-on:animCreated="handleAnimation"/>
  </div>
</template>

<script>
  import Lottie from 'vue-lottie'
  import * as animationData from '../../assets/json/5858-previous-track.json'

  export default {
    name: 'Lottie-PreviousTrack',
    components: {
      'lottie': Lottie
    },
    mounted () {
      this.stop()
    },
    data () {
      return {
        defaultOptions: {
          loop: true,
          animationData: animationData
        },
        animationSpeed: 1
      }
    },
    methods: {
      handleAnimation (anim) {
        this.anim = anim
      },
      stop () {
        console.log('Lottie-PreviousTrack.stop')
        this.anim.stop()
      },
      play () {
        console.log('Lottie-PreviousTrack.play')
        this.anim.play()
      },
      playOnce () {
        console.log('Lottie-PreviousTrack.playOnce')
        this.defaultOptions.loop = false
        this.anim.play()
      }
    }
  }
</script>

<style scoped>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div:hover {
    border-radius: 100px;
    background-color: #ffffff22;
  }
</style>
