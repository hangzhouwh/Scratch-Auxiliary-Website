<template>
  <div id="app">
    <lottie :options="defaultOptions" :width="35" v-on:animCreated="handleAnimation"/>
  </div>
</template>

<script>
  import Lottie from 'vue-lottie'
  import * as animationData from '../../assets/json/3400-music-spectrum.json'

  export default {
    name: 'Lottie',
    components: {
      'lottie': Lottie
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
        console.log('Lottie-MusicSpectrum.stop')
        this.anim.stop()
      },

      play () {
        console.log('Lottie-MusicSpectrum.play')
        this.anim.play()
      },

      pause () {
        console.log('Lottie-MusicSpectrum.pause')
        this.anim.pause()
      },

      onSpeedChange () {
        this.anim.setSpeed(this.animationSpeed)
      },

      changeLoop () {
        console.log('Lottie-MusicSpectrum.loop=')
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
</style>
