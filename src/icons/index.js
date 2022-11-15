/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:54:59
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-06 09:05:52
 * @FilePath: \hxomsp-blockchain-web\src\icons\index.js
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index'

// 全局注册
Vue.component('SvgIcon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
