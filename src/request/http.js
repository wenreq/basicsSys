import axios from './axios.js'
import {Notice} from 'view-design'
export function httpGet (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      Notice.error({
        title: '错误',
        desc: err
      })
      console.warn(err)
      reject(err)
    })
  })
}

export function httpPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      Notice.error({
        title: '错误',
        desc: err
      })
      console.warn(err)
      reject(err)
    })
  })
}
