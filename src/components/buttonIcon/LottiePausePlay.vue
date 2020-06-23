<template>
  <div id="app">
    <lottie :options="defaultOptions" :width="60" v-on:animCreated="handleAnimation"/>
  </div>
</template>

<script>
  import Lottie from 'vue-lottie'
  import * as animationData from '../../assets/json/5857-pause-play.json'

  export default {
    name: 'Lottie',
    components: {
      'lottie': Lottie
    },
    mounted () {
      this.stop()
    },
    data () {
      return {
        defaultOptions: {
          loop: false,
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
        console.log('Lottie-PausePlay.stop')
        this.anim.setDirection(-1)
        this.anim.play()
      },

      play () {
        console.log('Lottie-PausePlay.play')
        this.anim.setDirection(1)
        this.anim.play()
      },

      enter () {

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
