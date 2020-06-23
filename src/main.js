// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import './plugins/elementui.js'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'

Vue.use(Vuex)
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8880/api'
/*'http://39.101.189.21:8880/api'*/

Vue.use(VueResource)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: {
    App
  },
  template: '<App/>'
})
