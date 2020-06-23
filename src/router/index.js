import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register'
import RegisterEnterPwd from '../views/RegisterEnterPwd'
import RegisterGetVc from '../views/RegisterGetVc'
import Home from '../views/Home.vue'
import Tabs from '../views/Tabs'
import Found from '../views/Found'
import Favourite from '../views/Favourite/Favourite'
import Log from '../views/Log'
import FavouriteSong from '../views/Favourite/FavouriteSong'
import FavouriteArtists from '../views/Favourite/FavouriteArtists'
import SongSheet from '../views/SongSheet'
import SearchResult from '../views/Search/SearchResult'
import SearchResultSong from '../views/Search/SearchResultSong'
import SearchResultArtists from '../views/Search/SearchResultArtists'
import SearchResultSheet from '../views/Search/SearchResultSheet'
import SearchResultLyrics from '../views/Search/SearchResultLyrics'

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
      redirect: '/Login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
      redirect: '/registerGetVc',
      children:[
        {
          path: '/registerGetVc',
          component: RegisterGetVc,
        },
        {
          path: '/registerEnterPwq',
          component: RegisterEnterPwd,
        }
      ]
    },
    {
      path: '/home',
      component: Home,
      redirect: '/tabs',
      children: [
        {
          path: '/tabs',
          component: Tabs,
        },
        {
          path: '/found',
          component: Found,
        },
        {
          path: '/favourite',
          component: Favourite,
          redirect: '/favourite/song',
          children: [
            {
              path: '/favourite/song',
              component: FavouriteSong
            },
            {
              path: '/favourite/artists',
              component: FavouriteArtists
            }
          ]
        },
        {
          path: '/log',
          component: Log
        },
        {
          path: '/sheet/:sheet_id',
          name: 'sheet',
          component: SongSheet
        },
        {
          path: '/searchResult',
          component: SearchResult,
          redirect: '/searchResult/song',
          children: [
            {
              path: '/searchResult/song',
              component: SearchResultSong
            },
            {
              path: '/searchResult/artists',
              component: SearchResultArtists
            },
            {
              path: '/searchResult/sheet',
              component: SearchResultSheet
            },
            {
              path: '/searchResult/lyrics',
              component: SearchResultLyrics
            }
          ]
        }
      ]
    }
  ]
})
