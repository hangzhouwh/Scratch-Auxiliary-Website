// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import {postRequest} from './utils/api'
import {postRequest2} from './utils/api'
import {getRequest} from './utils/api'

Vue.prototype.postRequest = postRequest
Vue.prototype.postRequest2 = postRequest2
Vue.prototype.getRequest = getRequest

import 'font-awesome/css/font-awesome.min.css'
import './plugins/elementui.js'

Vue.config.productionTip = false

//路由守卫
router.beforeEach((to, from, next) => {
  var host = store.getters.host
  if (to.path == '/') {
    next()
  }
  if (host == null) {
    if (to.meta.requireAuth) {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    next()
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
