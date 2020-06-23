<template>
  <div id="app">
    <lottie :options="defaultOptions" :width="40" v-on:animCreated="handleAnimation"/>
  </div>
</template>

<script>
  import Lottie from 'vue-lottie'
  import * as animationData from '../../assets/json/5854-mute-un-mute'

  export default {
    name: 'Lottie',
    components: {
      'lottie': Lottie
    },
    mounted () {
      this.play()
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
        console.log('Lottie-Mute.stop')
        this.anim.setDirection(-1)
        this.anim.play()
      },

      play () {
        console.log('Lottie-Mute.play')
        this.anim.setDirection(1)
        this.anim.play()
      },

      enter () {

      }
    }
  }
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div:hover {
    border-radius: 100px;
    background-color: $background-menu-active-color;
  }
</style>
