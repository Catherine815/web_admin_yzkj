/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-04-02 10:16:44
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-11 14:35:05
 * @FilePath: \explorer\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const blockTokenKey = 'Block-Token'

export function getBlockToken() {
  return Cookies.get(blockTokenKey)
}

export function setBlockToken(token) {
  return Cookies.set(blockTokenKey, token)
}

export function removeBlockToken() {
  return Cookies.remove(blockTokenKey)
}
