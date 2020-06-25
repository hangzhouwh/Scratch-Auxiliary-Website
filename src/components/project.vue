<template>
  <div class="project">
    <router-link :to="'/project/' + info.pid" class="project-main">
      <img :src="info.image">
      <h4>{{ info.name }}</h4>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'project',
    data () {
      return {
        props: {
          info: Object
        }
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .project {
    margin: 32px;
    padding: 32px;
    background: #fff;
    border: 1px solid #dddee1;
    border-radius: 10px;
    overflow: hidden;
  }

  .project-image {
    width: 50%;
    height: 550px;
    float: left;
    text-align: center;
  }

  .project-image img {
    height: 100%;
  }

  .project-info {
    width: 50%;
    padding: 150px 0 250px;
    height: 150px;
    float: left;
    text-align: center;
  }

  .project-desc img {
    display: block;
    width: 50%;
    margin: 32px auto;
    padding: 32px;
    border-bottom: 1px solid #dddee1;
  }
</style>
