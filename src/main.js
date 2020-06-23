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
    register_host: null,
    search_input: null,
    user_info: {
      host: null,
      name: null,
      sex: null,
      email: null,
      phone: null,
      age: null
    },
    recommendList: {
      data1: null,
      value1: false,
      data2: null,
      value2: false
    },
  },
  mutations: {
    postRegisterHost (state, register_host) {
      state.register_host = register_host
    },
    postSearchInput (state, search_input) {
      state.search_input = search_input
    },
    postUserInfo (state, user_info) {
      state.user_info = user_info
    },
    postHost (state, host) {
      state.user_info.host = host
    },
    postData1 (state, data) {
      state.recommendList.data1 = data
    },
    postValue1 (state, data) {
      state.recommendList.value1 = data
    },
    postData2 (state, data) {
      state.recommendList.data2 = data
    },
    postValue2 (state, data) {
      state.recommendList.value2 = data
    },
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
