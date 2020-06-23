<template>
  <div id="app">
    <lottie :options="defaultOptions" :height="60" :width="60" v-on:animCreated="handleAnimation"/>
  </div>
</template>

<script>
  import Lottie from 'vue-lottie'
  import * as animationData from '../assets/json/22770-hello-peep.json'

  export default {
    components: {
      'lottie': Lottie
    },
    data() {
      return {
        defaultOptions: {animationData: animationData},
        animationSpeed: 1
      }
    },
    methods: {
      handleAnimation: function (anim) {
        this.anim = anim;
      },

      stop: function () {
        this.anim.stop();
      },

      play: function () {
        this.anim.play();
      },

      pause: function () {
        this.anim.pause();
      },

      onSpeedChange: function () {
        this.anim.setSpeed(this.animationSpeed);
      }
    }
  }
</script>

<style scoped>
</style>
