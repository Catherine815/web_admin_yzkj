/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-04-02 15:08:24
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-02 15:57:17
 * @FilePath: \hxomsp-blockchain-web\src\store\modules\area.js
 */
import { getAreaList } from '@/api/user'

const state = {
  areaList: []
}

const mutations = {
  SETAREALIST: (state, areaList) => {
    state.areaList = areaList
  }
}

const actions = {
  getAreaList({ commit }) {
    return new Promise((resolve, reject) => {
      // login({ username: username.trim(), password: password }).then(async(response) => {
      //   console.log(response)
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      getAreaList().then(async(response) => {
        if (response.code === 0) {
          const { data } = response
          commit('SETAREALIST', data)
          resolve(data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
