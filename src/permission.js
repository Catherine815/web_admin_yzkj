/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-04-11 15:15:55
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-27 15:35:53
 * @FilePath: \explorer\src\permission.js
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getBlockToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar

  // determine whether the user has logged in
  const hasToken = getBlockToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission through getAccountInfo
      const hasRoles = store.getters.status && store.getters.role
      if (hasRoles) {
        next()
      } else {
        try {
          // get account info
          const { status, role } = await store.dispatch('user/getAccountInfo')
          // note: roles must be a object array! such as: [1] or ,[1, 2, 3]
          const roles = status && role ? [role] : [1] // when status is false, show the menulist when status is true and role is 1
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          for (let i = 0; i < accessRoutes.length; i++) {
            router.addRoute(accessRoutes[i])
          }

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // next(`/login?redirect=${to.path}`)
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
