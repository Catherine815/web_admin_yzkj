/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:20:10
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-11-15 11:27:39
 * @FilePath: \web_admin_yzkj\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 解决控制台报错：vue-router.esm.js?8c4f:2007 Uncaught (in promise) NavigationDuplicated
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Layout from '@/layout'
/**
* hidden: true,                    (默认 false)当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
* redirect: 'noRedirect',          当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
* alwaysShow: true,                当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
*                                  只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
*                                  若你想不管路由下面的 children 声明的个数都显示你的根路由
*                                  你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
* name: 'router-name',             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta: {
*  roles: [1, 2],                  设置该路由进入的权限，支持多个权限叠加;角色：1: 档案人 2：审核员 3：监管员
*  title: 'title',                 设置该路由在侧边栏和面包屑中展示的名字
*  icon: 'svg-name',               设置该路由的图标
*  noCache: true,                  如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
*  breadcrumb: false,              如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
*  activeMenu: '/video/list'       当路由设置了该属性，则会高亮相对应的侧边栏。
*                                  这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
*                                  点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
* }
*/

// constantRoutes:不需要权限验证的页面，每种roles都可访问
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', noCache: true, icon: 'home' }
      }
    ]
  }
]

// asyncRoutes：需要根据角色权限验证动态挂载的路由
export const asyncRoutes = [
  // {
  //   path: '/archivalStatistics',
  //   component: Layout,
  //   redirect: '/archivalStatistics/list',
  //   name: 'archivalStatistics',
  //   meta: { title: '档案统计', icon: 'archivalStatistics', roles: [1, 2, 3] },
  //   children: [
  //     {
  //       path: 'list',
  //       component: () => import('@/views/archivalStatistics/index'),
  //       name: 'archivalStatisticsList',
  //       meta: { title: '档案统计', noCache: true, roles: [1, 2, 3] }
  //     }
  //   ]
  // }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
