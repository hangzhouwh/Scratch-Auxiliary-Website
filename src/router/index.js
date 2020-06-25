import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/register',
      component: () => import('../views/login/Register.vue'),
      redirect: '/registerGetVc',
      children: [
        {
          path: '/registerGetVc',
          component: () => import('../views/login/RegisterGetVc.vue'),
        },
        {
          path: '/registerEnterPwq',
          component: () => import('../views/login/RegisterEnterPwd.vue'),
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue'),
    },
    {
      path: '/home',
      component: () => import('../views/Home.vue'),
      redirect:'/home/video_list',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/home/video_list',
          component: () => import('../views/ProjectList.vue'),
          meta: {
            requireAuth: true
          },
        }
      ]
    }
  ]
})
