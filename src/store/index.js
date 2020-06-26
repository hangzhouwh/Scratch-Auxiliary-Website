import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import register from './modules/register'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    register
  },
  getters
})

export default store
