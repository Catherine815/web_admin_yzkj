/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:16:21
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-06-17 10:23:11
 * @FilePath: \account\src\store\modules\app.js
 */
import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: !!+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  }
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
