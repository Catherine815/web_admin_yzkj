/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-30 10:47:59
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-11-15 11:28:24
 * @FilePath: \web_admin_yzkj\src\main.js
 */
import Vue from 'vue'

import './plugins/element.js'
import '@/styles/index.scss'

import App from './App.vue'
// import router from './router'
// import store from './store'

import './icons' // icon
// import './permission.js' // permission control

Vue.config.productionTip = false

new Vue({
  // router,
  // store,
  render: h => h(App)
}).$mount('#app')
