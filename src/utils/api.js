import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'
import QS from 'qs'

// 请求拦截器
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('Authorization')) {
//       //token字段是要和后端协商好的
//       config.headers.common['token'] = localStorage.getItem('Authorization')
//       // debugger
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   })

// 响应拦截器
axios.interceptors.response.use(success => {
  // console.log('拦截前的response-success:')
  // console.log(success)
  if (success.status && success.status == 200 && success.data.status == 500) {
    Message.error({message: success.data.msg})
    return
  }
  if (success.data.code == 'error') {
    Message.error({message: success.data.msg})
    return
  }
  if (success.data.msg) {
    Message.success({message: success.data.msg})
  }
  return success.data
}, error => {
  // console.log('拦截前的response-error:')
  // console.log(error)
  if (error.response.status == 504 || error.response.status == 404) {
    Message.error({message: '服务器被吃了( ╯□╰ )'})
  } else if (error.response.status == 403) {
    Message.error({message: '权限不足，请联系管理员'})
  } else if (error.response.status == 401) {
    Message.error({message: error.response.data.msg ? error.response.data.msg : '尚未登录，请登录'})
    router.replace('/')
  } else {
    if (error.response.data.msg) {
      Message.error({message: error.response.data.msg})
    } else {
      Message.error({message: '未知错误!'})
    }
  }
  return
})

let base = 'http://39.99.211.127:8880'
// let base = 'http://localhost:8889'

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    params: params
  })
}
export const postRequest2 = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params
  })
}

export const getRequest2 = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}
