import {
  S_IRWXG
} from "constants";

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime
}

wx.ajax = function (path, data, method) {
  const host = "https://xcx.oucolab.cn"
  if (path === undefined) path = ''
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + path,
      data,
      method,
      success: resolve,
      fail: reject
    })
  })
}

wx.get = function (path, data) {
  return wx.ajax(path, data, 'GET')
}

wx.post = function (path, data) {
  return wx.ajax(path, data, 'POST')
}
