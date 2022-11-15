/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:24:48
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-05-06 14:02:43
 * @FilePath: \explorer\src\utils\index.js
 */
/* 公共方法 */

/**
 * 获取当前日期时间 YYYY-MM-DD HH:MM:SS
 */
export function getCurDateTime() {
  const type = arguments[0]
  const c_date = new Date()
  const { y, mo, d, h, mi, s } = {
    y: c_date.getFullYear(),
    mo: c_date.getMonth() + 1 < 10 ? `0${c_date.getMonth() + 1}` : c_date.getMonth() + 1,
    d: c_date.getDate() < 10 ? `0${c_date.getDate()}` : c_date.getDate(),
    h: c_date.getHours() < 10 ? `0${c_date.getHours()}` : c_date.getHours(),
    mi: c_date.getMinutes() < 10 ? `0${c_date.getMinutes()}` : c_date.getMinutes(),
    s: c_date.getSeconds() < 10 ? `0${c_date.getSeconds()}` : c_date.getSeconds()
  }
  // console.log(`${y}-${mo}-${d} ${h}:${mi}:${s}`)
  const format = type === undefined ? `${y}-${mo}-${d}` : `${y}-${mo}-${d} ${h}:${mi}:${s}`
  return format
}

/**
 * 将时间戳转为日期 YYYY-MM-DD HH:MM:SS or YYYY-MM-DD
 * type 1:YYYY-MM-DD  2:YYYY-MM-DD HH:MM:SS
 */
export function getDateTime(date, type) {
  const c_date = new Date(date)
  if (type && type === 1) {
    const { y, mo, d, h, mi, s } = {
      y: c_date.getFullYear(),
      mo: c_date.getMonth() + 1 < 10 ? `0${c_date.getMonth() + 1}` : c_date.getMonth() + 1,
      d: c_date.getDate() < 10 ? `0${c_date.getDate()}` : c_date.getDate(),
      h: c_date.getHours() < 10 ? `0${c_date.getHours()}` : c_date.getHours(),
      mi: c_date.getMinutes() < 10 ? `0${c_date.getMinutes()}` : c_date.getMinutes(),
      s: c_date.getSeconds() < 10 ? `0${c_date.getSeconds()}` : c_date.getSeconds()
    }
    return `${y}-${mo}-${d} ${h}:${mi}:${s}`
  } else {
    const { y, mo, d } = {
      y: c_date.getFullYear(),
      mo: c_date.getMonth() + 1 < 10 ? `0${c_date.getMonth() + 1}` : c_date.getMonth() + 1,
      d: c_date.getDate() < 10 ? `0${c_date.getDate()}` : c_date.getDate()
    }
    return `${y}-${mo}-${d}`
  }
}

// 设置cookie
export function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = 'expires=' + d.toUTCString()
  // console.info(cname + '=' + cvalue + '; ' + expires)
  document.cookie = cname + '=' + cvalue + '; ' + expires
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 处理地区列表数据
export function processAreaData(_data) {
  const pData = _data.filter(item => item.areaPid === '0')
  function treeIteration(arr) {
    arr.forEach(item => {
      _data.forEach(j => {
        if (j.areaPid === item.areaId) {
          if (!item.children) {
            item.children = []
          }
          item.children.push(j)
        }
      })
      if (item.children && item.children.length) {
        treeIteration(item.children)
      }
    })
  }
  treeIteration(pData)
  return pData
}

// 根据areaId选择出整个node节点
export function checkedAreaNode(areaId, areaList) {
  if (!areaId || !areaList || !(areaList instanceof Array) || areaList.length <= 0) return
  const res = []
  function findObjItem(id, data) {
    data.forEach(item => {
      if (!(item instanceof Object)) return
      if (item.areaId === id) {
        res.push(item)
      } else {
        if (item.children && item.children.length) {
          findObjItem(id, item.children)
        }
      }
    })
  }
  findObjItem(areaId, areaList)
  return res
}
