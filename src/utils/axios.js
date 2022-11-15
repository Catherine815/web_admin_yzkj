/* eslint-disable eqeqeq */
/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:30:10
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-05-10 15:40:51
 * @FilePath: \explorer\src\utils\axios.js
 */
import axios from 'axios'
// import { Message } from 'element-ui'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// http request 拦截器
http.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log('axios-request-config:')
    // console.log(config)
    return config
  },
  error => {
    // do something with request error
    console.log('axios-request-error' + error) // for debug
    return Promise.reject(error)
  }
)

// http response 拦截器
http.interceptors.response.use(
  response => {
    // console.log('axios-response:')
    // console.log(response)
    if (response.data) {
      const res = response.data
      // 如果返回的code值为0或者200，则请求成功，否则出错
      if (res.code == '0' || res.code === 200) {
        return res
      } else {
        Message({
          showClose: true,
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        // 201: 业务平台登录失败; 202：业务平台登录参数错误； 1001：link平台登录失败 1003：link平台token错误；
        if (res.code === 201 || res.code === 202 || res.code === 1001 || res.code === 1003) {
          // to re-login
          MessageBox.confirm('登录参数有误,请重新登录', '确认退出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }
        return Promise.reject(new Error(res.msg || 'Error'))
      }
    } else {
      return response
    }
  },
  error => {
    console.log('response_error:' + error)
    Message({
      showClose: true,
      message: error.response.data.msg || error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default http
