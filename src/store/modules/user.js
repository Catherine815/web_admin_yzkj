/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-04-01 13:05:40
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-27 15:50:15
 * @FilePath: \explorer\src\store\modules\user.js
 */
import Cookies from 'js-cookie'
import { login, loginLink, logout } from '@/api/user'
import { getAccount } from '@/api/account'
import { getBlockToken, setBlockToken, removeBlockToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  blockToken: getBlockToken(),
  areaId: Cookies.get('areaId') || '',
  areaCode: Cookies.get('areaCode') || '',
  username: Cookies.get('username') || '', // 账号
  id: Cookies.get('id') || '', // 用户名，业务用户ID唯一标识
  clientId: Cookies.get('clientId') || '', // 当前登录人在fabric上的标识id：clientId
  role: '',
  // status:当角色role为3时，即为监管员时，status会有false和true之分；
  // 为false时没有权限访问注册档案人、注册操作人、监管人审核这些页面。为true时可以
  status: ''
}

const mutations = {
  SET_BLOCK_TOKEN: (state, blockToken) => {
    state.blockToken = blockToken
  },
  SET_AREAID: (state, areaId) => {
    state.areaId = areaId
  },
  SET_AREACODE: (state, areaCode) => {
    state.areaCode = areaCode
  },
  SET_USER_NAME: (state, username) => {
    state.username = username
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_CLIENTID: (state, clientId) => {
    state.clientId = clientId
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_STATUS: (state, status) => {
    state.status = status
  }
}

const actions = {
  // 业务平台登录
  login({ commit }, userInfo) {
    const { areaId, userCode, userPassword } = userInfo
    return new Promise((resolve, reject) => {
      login({ areaId, userCode: userCode.trim(), userPassword }).then((response) => {
        const { data } = response
        commit('SET_USER_NAME', userCode)
        commit('SET_AREAID', data.areaId)
        commit('SET_AREACODE', data.areaCode)
        commit('SET_ID', data.id)
        commit('SET_CLIENTID', data.clientId)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登录link
  loginLink({ commit }, linkInfo) {
    const { name, channelid, orgname, role, peer } = linkInfo
    return new Promise((resolve, reject) => {
      loginLink({ name: name, channelid: channelid, orgname: orgname, role: role, peer: peer }).then((response) => {
        const { data } = response
        commit('SET_BLOCK_TOKEN', data.token)
        setBlockToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getAccountInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const query = {
        token: state.blockToken,
        peer: 'peer0.org1.example.com'
      }
      getAccount(query).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { role, status } = data
        // role and status must be valid
        if (!role) {
          reject('getAccount: role must be valid')
        }
        commit('SET_ROLE', role)
        commit('SET_STATUS', status)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({ token: state.blockToken }).then((response) => {
        commit('SET_BLOCK_TOKEN', '')
        commit('SET_STATUS', '')
        commit('SET_ROLE', '')
        commit('SET_USER_NAME', '')
        commit('SET_AREAID', '')
        commit('SET_AREACODE', '')
        commit('SET_ID', '')
        commit('SET_CLIENTID', '')
        removeBlockToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_BLOCK_TOKEN', '')
        removeBlockToken()
        resolve()
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
