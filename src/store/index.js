/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:14:55
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-11 14:56:25
 * @FilePath: \explorer\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
})

export default store
