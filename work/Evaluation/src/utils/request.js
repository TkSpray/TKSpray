/**
 * get/post封装
 */

import conf from '../config.js'

// import conf from '@/config'

export function request (url, method, data = null, encoded = true, decode = true) {
  console.debug('[Request]', method, url, data, encoded)
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest()
    if (conf.PHPDEBUG) { url += '?XDEBUG_SESSION_START=10745' }
    xhr.open(method, url)
    if (encoded && method === 'POST') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    }
    if (conf.CORS) {
      xhr.withCredentials = true
    }
    xhr.onload = function () {
      if (xhr.status === 200) {
        if (decode) {
          const res = JSON.parse(xhr.response)
          if (res.status !== 0) {
            reject(res)
          } else {
            resolve(res)
          }
        } else {
          resolve(xhr.response)
        }
      } else {
        reject(xhr.responseText)
      }
    }
    xhr.onerror = xhr.onabort = function () {
      reject(xhr.responseText)
    }
    xhr.send(data)
  })
}

/**
 * POST请求
 * @param url 地址
 * @param data 数据
 */
export function post (url, data) {
  if (typeof data === 'object') {
    data = Object.keys(data).reduce((pre_val, cur_val) => {
      return cur_val + '=' + data[cur_val] + '&' + pre_val
    }, '_=1')
  }
  return request(url, 'POST', data)
}
