import {httpPost} from '../http.js'

export function getList (params) {
  return httpPost('/memberUser/getList', params)
}
